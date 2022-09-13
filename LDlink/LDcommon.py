import boto3
import botocore
import csv
import os
from numpy import False_
import yaml
from pymongo import MongoClient
import json
import math
import re
import shutil
import subprocess
from bson import json_util
from LDutilites import get_config,get_config_admin
from collections import OrderedDict
# retrieve config
param_list = get_config()
param_list_db = get_config_admin()
api_mongo_addr = param_list_db['api_mongo_addr']
mongo_username = param_list_db['mongo_username']
mongo_username_api = param_list_db['mongo_username_api']
mongo_password = param_list_db['mongo_password']
mongo_port = param_list_db['mongo_port']
mongo_db_name = param_list_db['mongo_db_name']
email_account = param_list_db['email_account']
is_centralized = param_list_db['connect_external']

aws_info = param_list['aws_info']
env = param_list['env']
dbsnp_version = param_list['dbsnp_version']
population_samples_dir = param_list['population_samples_dir']
data_dir = param_list['data_dir']
tmp_dir = param_list['tmp_dir']
genotypes_dir = param_list['genotypes_dir']


genome_build_vars = {
    "vars": ['grch37', 'grch38', 'grch38_high_coverage'],
    "grch37": {
        "title": "GRCh37",
        "title_hg": "hg19",
        "chromosome": "chromosome_grch37",
        "position": "position_grch37",
        "gene_begin": "begin_grch37",
        "gene_end": "end_grch37",
        "refGene": "refGene_grch37",
        "1000G_dir": "GRCh37",
        "1000G_file": "ALL.chr%s.phase3_shapeit2_mvncall_integrated_v5.20130502.genotypes.vcf.gz",
        "1000G_chr_prefix": "",
        "ldassoc_example_file": "prostate_example_grch37.txt"
    },
    "grch38": {
        "title": "GRCh38",
        "title_hg": "hg38",
        "chromosome": "chromosome_grch38",
        "position": "position_grch38",
        "gene_begin": "begin_grch38",
        "gene_end": "end_grch38",
        "refGene": "refGene_grch38",
        "1000G_dir": "GRCh38",
        "1000G_file": "ALL.chr%s.shapeit2_integrated_snvindels_v2a_27022019.GRCh38.phased.vcf.gz",
        "1000G_chr_prefix": "",
        "ldassoc_example_file": "prostate_example_grch38.txt"
    },
    "grch38_high_coverage": {
        "title": "GRCh38 High Coverage",
        "title_hg": "hg38_HC",
        "chromosome": "chromosome_grch38",
        "position": "position_grch38",
        "gene_begin": "begin_grch38",
        "gene_end": "end_grch38",
        "refGene": "refGene_grch38",
        "1000G_dir": "GRCh38_High_Coverage",
        "1000G_file": "CCDG_14151_B01_GRM_WGS_2020-08-05_chr%s.filtered.shapeit2-duohmm-phased.vcf.gz",
        "1000G_chr_prefix": "chr",
        "ldassoc_example_file": "prostate_example_grch38.txt"
    }
}

def checkS3File(aws_info, bucket, filePath):
    if ('aws_access_key_id' in aws_info and len(aws_info['aws_access_key_id']) > 0 and 'aws_secret_access_key' in aws_info and len(aws_info['aws_secret_access_key']) > 0):
        session = boto3.Session(
            aws_access_key_id=aws_info['aws_access_key_id'],
            aws_secret_access_key=aws_info['aws_secret_access_key'],
        )
        s3 = session.resource('s3')
    else: 
        s3 = boto3.resource('s3')
    try:
        s3.Object(bucket, filePath).load()
    except botocore.exceptions.ClientError as e:
        if e.response['Error']['Code'] == "404":
            raise Exception("File not found in AWS S3.")
            # return False
        else:
            raise Exception("File not found in AWS S3.")
            # return False
    else: 
        return True

def retrieveAWSCredentials():
    if ('aws_access_key_id' in aws_info and len(aws_info['aws_access_key_id']) > 0 and 'aws_secret_access_key' in aws_info and len(aws_info['aws_secret_access_key']) > 0):
        export_s3_keys = "export AWS_ACCESS_KEY_ID=%s; export AWS_SECRET_ACCESS_KEY=%s;" % (aws_info['aws_access_key_id'], aws_info['aws_secret_access_key'])
    else:
        # retrieve aws credentials here
        session = boto3.Session()
        credentials = session.get_credentials().get_frozen_credentials()
        export_s3_keys = "export AWS_ACCESS_KEY_ID=%s; export AWS_SECRET_ACCESS_KEY=%s; export AWS_SESSION_TOKEN=%s;" % (credentials.access_key, credentials.secret_key, credentials.token)
    return export_s3_keys

def connectMongoDBReadOnly(readonly, api=False, connect_db_server=False):
    # Connect to 'api_mongo_addr' MongoDB endpoint if app started locally (specified in config.yml)
    if is_centralized:
        if bool(readonly):
            client = MongoClient('mongodb://' + mongo_username + ':' + mongo_password + '@' + api_mongo_addr +'/LDLink', mongo_port)
        else:
            client = MongoClient('mongodb://' + mongo_username_api + ':' + mongo_password + '@' + api_mongo_addr +'/LDLink', mongo_port)
    else:
        if env == 'local' or connect_db_server:
            mongo_host = api_mongo_addr
        else: 
            mongo_host = 'localhost'
       
        if api:
            client = MongoClient('mongodb://' + mongo_username_api + ':' + mongo_password + '@' + mongo_host + '/LDLink', mongo_port)
        else:
            if readonly:
                client = MongoClient('mongodb://' + mongo_username + ':' + mongo_password + '@' + mongo_host + '/admin', mongo_port)
            else:
                if env == 'local':
                    client = MongoClient('mongodb://' + mongo_username + ':' + mongo_password + '@' + mongo_host + "/admin", mongo_port)
                else:
                    client = MongoClient('localhost', mongo_port)  
    db = client["LDLink"]
    return db

def get_aws_credentials():
    if (
        "aws_access_key_id" in aws_info
        and len(aws_info["aws_access_key_id"]) > 0
        and "aws_secret_access_key" in aws_info
        and len(aws_info["aws_secret_access_key"]) > 0
    ):
        return {
            "AWS_ACCESS_KEY_ID": aws_info["aws_access_key_id"],
            "AWS_SECRET_ACCESS_KEY": aws_info["aws_secret_access_key"],
        }
    else:
        credentials = boto3.Session().get_credentials().get_frozen_credentials()
        return {
            "AWS_ACCESS_KEY_ID": credentials.access_key,
            "AWS_SECRET_ACCESS_KEY": credentials.secret_key,
            "AWS_SESSION_TOKEN": credentials.token,
        }

def get_command_output(*cmd, **subprocess_args):
    output = subprocess.check_output(cmd, **subprocess_args)
    return [line.decode("utf-8") for line in output.splitlines()]

def tabix(*tabix_args, **subprocess_args):
    tabix_path = shutil.which("tabix")
    cmd = [tabix_path, *tabix_args]
    args = {"env": get_aws_credentials(), **subprocess_args}
    return get_command_output(*cmd, **args)

def get_1000g_data(snp_pos, snp_coords, genome_build, query_dir):
    vcf_filepath, tabix_coords, query_file = get_vcf_snp_params(snp_pos, snp_coords, genome_build)
    checkS3File(aws_info, aws_info['bucket'], vcf_filepath)

    # ensure tabix_coords is a list
    tabix_coords = re.split('\s+', tabix_coords.strip())
    output = tabix("-fhD", "--separate-regions", query_file, *tabix_coords, cwd=query_dir)
    vcf = [line for line in output if "END" not in line]

    return get_head(vcf)

def get_1000g_data_single(vcf_pos, snp_coord, genome_build, query_dir, request, write_output):
    vcf_filepath, tabix_coords, query_file = get_vcf_snp_params([vcf_pos], [snp_coord], genome_build)
    checkS3File(aws_info, aws_info['bucket'], vcf_filepath)

    tabix_coords = re.split('\s+', tabix_coords.strip())
    output = tabix("-fhD", query_file, *tabix_coords, cwd=query_dir)
    vcf = [line for line in output if "END" not in line]

    if write_output:
        temp_filepath = tmp_dir + "snp_no_dups_" + request + ".vcf"
        with open(temp_filepath, "w") as f:
            f.write("\n".join(vcf))
            
    return get_head(vcf)

def retrieveTabix1000GData(snp_pos, snp_coords, genome_build,query_dir):
    vcf_filePath,tabix_coords,query_file = get_vcf_snp_params(snp_pos,snp_coords,genome_build)
    checkS3File(aws_info, aws_info['bucket'], vcf_filePath)
    export_s3_keys = retrieveAWSCredentials()
    tabix_snps = export_s3_keys + " cd {2}; tabix -fhD --separate-regions {0}{1} | grep -v -e END".format(
        query_file, tabix_coords, query_dir)
    # print("tabix_snps", tabix_snps)
    vcf = [x.decode('utf-8') for x in subprocess.Popen(tabix_snps, shell=True, stdout=subprocess.PIPE).stdout.readlines()]
    vcf,head = get_head(vcf)
    return vcf,head

def retrieveTabix1000GDataSingle(vcf_pos,snp_coord,genome_build, query_dir,request,is_output):
    vcf_filePath,tabix_coords,query_file=get_vcf_snp_params([vcf_pos],[snp_coord],genome_build)
    checkS3File(aws_info, aws_info['bucket'], vcf_filePath)
    export_s3_keys = retrieveAWSCredentials()
    if is_output:
        retrieve_command = " cd {2}; tabix -fhD  {0}{1} | grep -v -e END > {3}".format(query_file, tabix_coords, query_dir,tmp_dir + "snp_no_dups_" + request + ".vcf")
    else:
        retrieve_command = " cd {2}; tabix -fhD  {0}{1} | grep -v -e END".format(query_file, tabix_coords, query_dir)

    tabix_snps = export_s3_keys + retrieve_command
    vcf = [x.decode('utf-8') for x in subprocess.Popen(tabix_snps, shell=True, stdout=subprocess.PIPE).stdout.readlines()]
    if is_output:
        vcf = open(tmp_dir+"snp_no_dups_"+request+".vcf").readlines()
      
    vcf,head = get_head(vcf)
    return vcf,head

# Query genomic coordinates
def get_rsnum(db, coord, genome_build):
    temp_coord = coord.strip("chr").split(":")
    if len(temp_coord)<=1:
        return 
    chro = temp_coord[0]
    pos = temp_coord[1]
    query_results = db.dbsnp.find({"chromosome": chro.upper() if chro == 'x' or chro == 'y' else str(chro), genome_build_vars[genome_build]['position']: str(pos)})
    query_results_sanitized = json.loads(json_util.dumps(query_results))
    return query_results_sanitized

def processCollapsedTranscript(genes_same_name):
    chrom = genes_same_name[0]["chrom"]
    txStart = genes_same_name[0]["txStart"]
    txEnd = genes_same_name[0]["txEnd"]
    exonStarts = genes_same_name[0]["exonStarts"].split(",")
    exonEnds = genes_same_name[0]["exonEnds"].split(",")
    name = genes_same_name[0]["name"]
    name2 = genes_same_name[0]["name2"]
    transcripts = [name] * len(list(filter(lambda x: x != "",genes_same_name[0]["exonStarts"].split(","))))


    for gene in genes_same_name[1:]:
        txStart = gene['txStart'] if gene['txStart'] < txStart else txStart
        txEnd = gene['txEnd'] if gene['txEnd'] > txEnd else txEnd
        exonStarts = list(filter(lambda x: x != "", gene["exonStarts"].split(","))) + exonStarts
        exonEnds = list(filter(lambda x: x != "", gene["exonEnds"].split(","))) + exonEnds
        transcripts = transcripts + ([gene['name']] * len(list(filter(lambda x: x != "", gene["exonStarts"].split(",")))))
    return {
        "chrom": chrom,
        "txStart": txStart,
        "txEnd": txEnd,
        "exonStarts": ",".join(exonStarts),
        "exonEnds": ",".join(exonEnds),
        "name2": name2,
        "transcripts": ",".join(transcripts)
    }

def getRefGene(db, filename, chromosome, begin, end, genome_build, collapseTranscript):
    query_results = db[genome_build_vars[genome_build]['refGene']].find({
        "chrom": "chr" + chromosome, 
        "$or": [
            {
                "txStart": {"$lte": int(begin)}, 
                "txEnd": {"$gte": int(end)}
            }, 
            {
                "txStart": {"$gte": int(begin)}, 
                "txEnd": {"$lte": int(end)}
            },
            {
                "txStart": {"$lte": int(begin)}, 
                "txEnd": {"$gte": int(begin), "$lte": int(end)}
            },
            {
                "txStart": {"$gte": int(begin), "$lte": int(end)}, 
                "txEnd": {"$gte": int(end)}
            }
        ]
    })#.sort([("cdsEnd",1),("txStart",1)])
    if collapseTranscript:
        query_results_sanitized = json.loads(json_util.dumps(query_results)) 
        #print("$$$$$$",query_results_sanitized)
        group_by_gene_name = {}
        for gene in query_results_sanitized:
            # new gene name
            if gene['name2'] not in group_by_gene_name:
                group_by_gene_name[gene['name2']] = []
                group_by_gene_name[gene['name2']].append(gene)
            # same gene name as another's
            else:
                group_by_gene_name[gene['name2']].append(gene)
        #print(json.dumps(group_by_gene_name, indent=4, sort_keys=False))
        query_results_sanitized = []
        for gene_name_key in group_by_gene_name.keys():
            #print("#",gene_name_key)
            query_results_sanitized.append(processCollapsedTranscript(group_by_gene_name[gene_name_key]))
        # print(json.dumps(query_results_sanitized, indent=4, sort_keys=True))
    else:
        query_results_sanitized = json.loads(json_util.dumps(query_results)) 
    #temp = query_results_sanitized.pop(0)
    #query_results_sanitized.append(temp)
    #print(query_results_sanitized)
    with open(filename, "w") as f:
        for x in query_results_sanitized:
            f.write(json.dumps(x) + '\n')
    return query_results_sanitized

def getRecomb(db, filename, chromosome, begin, end, genome_build):
    recomb_results = db.recomb.find({
		genome_build_vars[genome_build]['chromosome']: str(chromosome), 
		genome_build_vars[genome_build]['position']: {
            "$gte": int(begin), 
            "$lte": int(end)
        }
	})
    recomb_results_sanitized = json.loads(json_util.dumps(recomb_results)) 

    with open(filename, "w") as f:
        for recomb_obj in recomb_results_sanitized:
            f.write(json.dumps({
                "rate": recomb_obj['rate'],
                genome_build_vars[genome_build]['position']: recomb_obj[genome_build_vars[genome_build]['position']]
            }) + '\n')
    return recomb_results_sanitized

def getEmail():
    return  email_account

#################################################################
#define common functions to Validate & retrieve SNP coordinates #
#################################################################
def validsnp(snplst,genome_build,snp_limits):
    # Validate genome build param
    output = {}
    if genome_build not in genome_build_vars['vars']:
        output["error"] = "Invalid genome build. Please specify either " + ", ".join(genome_build_vars['vars']) + "."
        return(json.dumps(output, sort_keys=True, indent=2))
    # print(snplst)
    # Open Inputted SNPs list file
    # if the input list is in a text file 
    if snplst:
         # for ldexpress, the snplst is array, not file path
        try:
            snps_raw = open(snplst).readlines()
        except:
            try:
                snps_raw = snplst.split("+")
            except: # for ldpair post input as array
                snps_raw = snplst

        if snp_limits:
            if len(snps_raw) > snp_limits:
                output["error"] = "Maximum variant list is "+ str(snp_limits) +"  RS numbers or coordinates. Your list contains " + \
                    str(len(snps_raw))+" entries."
                return(json.dumps(output, sort_keys=True, indent=2))

        # Remove duplicate RS numbers and cast to lower case
        snps = []
        for snp_raw in snps_raw:
            if type(snp_raw) is str:
                snp = snp_raw.lower().strip().split()
                if snp not in snps:
                    snps.append(snp)
            else:
                snps.append(snp_raw)
        return snps
    return 

def get_coords(db, rsid):
    rsid = rsid.strip("rs")
    query_results = db.dbsnp.find_one({"id": rsid})
    query_results_sanitized = json.loads(json_util.dumps(query_results))
    return query_results_sanitized

def get_coords_gene(gene_raw, db,genome_build):
    gene=gene_raw.upper()
    mongoResult = db.genes_name_coords.find_one({"name": gene})

    #format mongo output
    if mongoResult != None:
        geneResult = [mongoResult["name"], mongoResult[genome_build_vars[genome_build]['chromosome']], mongoResult[genome_build_vars[genome_build]['gene_begin']], mongoResult[genome_build_vars[genome_build]['gene_end']]]
        return geneResult
    else:
        return None


# def get_dbsnp_coord(db, chromosome, position):
#     query_results = db.dbsnp.find_one({"chromosome": str(chromosome), genome_build_vars[genome_build]['position']: str(position)})
#     query_results_sanitized = json.loads(json_util.dumps(query_results))
#     return query_results_sanitized

# Replace input genomic coordinates with variant ids (rsids)
def replace_coord_rsid(db, snp,genome_build,output):
    if snp[0:2] == "rs":
        return snp
    else:
        snp_info_lst = get_rsnum(db, snp, genome_build)
        if snp_info_lst != None:
            if len(snp_info_lst) > 1:
                var_id = "rs" + snp_info_lst[0]['id']
                ref_variants = []
                for snp_info in snp_info_lst:
                    if snp_info['id'] == snp_info['ref_id']:
                        ref_variants.append(snp_info['id'])
                if len(ref_variants) > 1:
                    var_id = "rs" + ref_variants[0]
                    if "warning" in output:
                        output["warning"] = output["warning"] + \
                        ". Multiple rsIDs (" + ", ".join(["rs" + ref_id for ref_id in ref_variants]) + ") map to genomic coordinates " + snp
                    else:
                        output["warning"] = "Multiple rsIDs (" + ", ".join(["rs" + ref_id for ref_id in ref_variants]) + ") map to genomic coordinates " + snp
                elif len(ref_variants) == 0 and len(snp_info_lst) > 1:
                    var_id = "rs" + snp_info_lst[0]['id']
                    if "warning" in output:
                        output["warning"] = output["warning"] + \
                        ". Multiple rsIDs (" + ", ".join(["rs" + ref_id for ref_id in ref_variants]) + ") map to genomic coordinates " + snp
                    else:
                        output["warning"] = "Multiple rsIDs (" + ", ".join(["rs" + ref_id for ref_id in ref_variants]) + ") map to genomic coordinates " + snp
                else:
                    var_id = "rs" + ref_variants[0]
                return var_id
            elif len(snp_info_lst) == 1:
                var_id = "rs" + snp_info_lst[0]['id']
                return var_id
            else:
                return snp
        else:
            return snp
    return snp


def replace_coords_rsid_list(db, snp_lst,genome_build,output):
    new_snp_lst = []
    for snp_raw_i in snp_lst:
        if len(snp_raw_i) > 0:
            snp = snp_raw_i[0]
            var_id = replace_coord_rsid(db, snp, genome_build,output)
            if snp != var_id:
                new_snp_lst.append([var_id])
            else:
                new_snp_lst.append(snp_raw_i)
    return new_snp_lst

##############################################
### common function to retrieve population ###
##############################################
def get_population(pop, request,output):
    # Select desired ancestral populations
    pops = pop.split("+")
    pop_dirs = []
    for pop_i in pops:
        if pop_i in ["ALL", "AFR", "AMR", "EAS", "EUR", "SAS", "ACB", "ASW", "BEB", "CDX", "CEU", "CHB", "CHS", "CLM", "ESN", "FIN", "GBR", "GIH", "GWD", "IBS", "ITU", "JPT", "KHV", "LWK", "MSL", "MXL", "PEL", "PJL", "PUR", "STU", "TSI", "YRI"]:
            pop_dirs.append(data_dir + population_samples_dir + pop_i + ".txt")
        else:
            output["error"] = pop_i + " is not an ancestral population. Choose one of the following ancestral populations: AFR, AMR, EAS, EUR, or SAS; or one of the following sub-populations: ACB, ASW, BEB, CDX, CEU, CHB, CHS, CLM, ESN, FIN, GBR, GIH, GWD, IBS, ITU, JPT, KHV, LWK, MSL, MXL, PEL, PJL, PUR, STU, TSI, or YRI."
            return(json.dumps(output, sort_keys=True, indent=2))

    get_pops = "cat " + " ".join(pop_dirs) + " > " + tmp_dir + "pops_" + request + ".txt"
    subprocess.call(get_pops, shell=True)

    pop_list = open(tmp_dir + "pops_" + request + ".txt").readlines()
    ids = [i.strip() for i in pop_list]
    pop_ids = list(set(ids))

    return pop_ids
 
 #####################################################
 ##   Define function to correct indel alleles     ###
 #####################################################
def set_alleles(a1, a2):
    if len(a1) == 1 and len(a2) == 1:
        a1_n = a1
        a2_n = a2
    elif len(a1) == 1 and len(a2) > 1:
        a1_n = "-"
        a2_n = a2[1:]
    elif len(a1) > 1 and len(a2) == 1:
        a1_n = a1[1:]
        a2_n = "-"
    elif len(a1) > 1 and len(a2) > 1:
        a1_n = a1[1:]
        a2_n = a2[1:]
    return(a1_n, a2_n)

#################################################
# get the genotype ###
#################################################
def get_query_variant_c(snp_coord, pop_ids, request, genome_build, is_output,output={}):
    queryVariantWarnings = []
    #vcf1_pos: 60697654; snp_coord: ['rs4672393', '2', '60697654']
    tmp_coord = [str(x) for x in snp_coord]
    tabix_query_snp_out,head = get_1000g_data_single(str(snp_coord[2]),tmp_coord, genome_build, data_dir + genotypes_dir + genome_build_vars[genome_build]['1000G_dir'],request, is_output)
    # Validate error
    if len(tabix_query_snp_out) == 0:
        # print("ERROR", "len(tabix_query_snp_out) == 0")
        # handle error: snp + " is not in 1000G reference panel."
        queryVariantWarnings.append([snp_coord[0], "NA", "Variant is not in 1000G reference panel."])
        output["error"] = snp_coord[0]+" Variant is not in 1000G reference panel." + str(output["error"] if "error" in output else "")
        #output["warning"] = snp_coord[0]+" Variant is not in 1000G reference panel." + str(output["warning"] if "warning" in output else "")
        if is_output:
            subprocess.call("rm " + tmp_dir + "pops_" + request + ".txt", shell=True)
            subprocess.call("rm " + tmp_dir + "*" + request + "*.vcf", shell=True)
        return (None, None, queryVariantWarnings)
    elif len(tabix_query_snp_out) > 1:
        geno = []
        for i in range(len(tabix_query_snp_out)):
            # if tabix_query_snp_out[i].strip().split()[2] == snp_coord[0]:
            geno = tabix_query_snp_out[i].strip().split()
            geno[0] = geno[0].lstrip('chr')
            #skip the geno did not on the same chromesome??
            #if not (geno[0] == snp_coord[1] and geno[1] == snp_coord[2]):
            #        geno = []
        if geno == []:
            # print("ERROR", "geno == []")
            # handle error: snp + " is not in 1000G reference panel."
            queryVariantWarnings.append([snp_coord[0], "NA", "Variant is not in 1000G reference panel."])
            output["error"] = "Variant is not in 1000G reference panel." + str(output["error"] if "error" in output else "")
            #output["warning"] = snp_coord[0]+" Variant is not in 1000G reference panel." + str(output["warning"] if "warning" in output else "")
            if is_output:
                subprocess.call("rm " + tmp_dir + "pops_" + request + ".txt", shell=True)
                subprocess.call("rm " + tmp_dir + "*" + request + "*.vcf", shell=True)
            return (None,None, queryVariantWarnings)
    else:
        geno = tabix_query_snp_out[0].strip().split()
        geno[0] = geno[0].lstrip('chr')
    if geno[2] != snp_coord[0] and "rs" in geno[2]:
            queryVariantWarnings.append([snp_coord[0], geno[2], "Genomic position does not match RS number at 1000G position (chr" + geno[0] + ":" + geno[1] + " = " + geno[2] + ")."])
            output["warning"] = "Genomic position does not match RS number at 1000G position (chr" + geno[0] + ":" + geno[1] + " = " + geno[2] + ")." + str(output["warning"] if "warning" in output else "")

            # snp = geno[2]

    if "," in geno[3] or "," in geno[4]:
        # print('handle error: snp + " is not a biallelic variant."')
        queryVariantWarnings.append([snp_coord[0], "NA", "Variant is not a biallelic."])

    index = []
    for i in range(9, len(head)):
        if head[i] in pop_ids:
            index.append(i)

    genotypes = {"0": 0, "1": 0}
    for i in index:
        sub_geno = geno[i].split("|")
        for j in sub_geno:
            if j in genotypes:
                genotypes[j] += 1
            else:
                genotypes[j] = 1

    if genotypes["0"] == 0 or genotypes["1"] == 0:
        # print('handle error: snp + " is monoallelic in the " + pop + " population."')
        queryVariantWarnings.append([snp_coord[0], "NA", "Variant is monoallelic in the chosen population(s)."])
    
    return(geno,head,queryVariantWarnings)

###################################################
######## parse vcf using --separate-regions   #####
###################################################
#def parse_vcf(vcf,snp_coords,output,genome_build,is_multi):
def parse_vcf(vcf,snp_coords,output,genome_build,ifsorted):
    delimiter = "#"
    snp_lists = str('**'.join(vcf)).split(delimiter)
    snp_dict = {}
    snp_rs_dict = {}
    missing_rs = []    
    snp_found_list = [] 
    #print(vcf)
    #print(snp_lists)
    for snp in snp_lists[1:]:
        snp_tuple = snp.split("**")
        snp_key = snp_tuple[0].split("-")[-1].strip()
        vcf_list = [] 
        #print(snp_tuple)
        match_v = ''
        for v in snp_tuple[1:]:#choose the matched one for dup; if no matched, choose first
            if len(v) > 0:
                match_v = v
                geno = v.strip().split()
                if geno[1] == snp_key:
                    match_v = v
                # if is_multi:
                #     vcf_list.append(v)
                #     snp_found_list.append(snp_key)  
                # else:
                #     match_v = v
                #     geno = v.strip().split()
                #     if geno[1] == snp_key:
                #         match_v = v
        if len(match_v) > 0:
            vcf_list.append(match_v)
            snp_found_list.append(snp_key)        
        #create snp_key as chr7:pos_rs4
        snp_dict[snp_key] = vcf_list
    
    missing_rs_snp = []
    for snp_coord in snp_coords:
        if snp_coord[-1] not in snp_found_list:
            missing_rs.append(snp_coord[0])
            missing_rs_snp.append([snp_coord[0],"chr"+snp_coord[1]+":"+snp_coord[2]])
        else:
            s_key = "chr"+snp_coord[1]+":"+snp_coord[2]+"_"+snp_coord[0]
            snp_rs_dict[s_key] = snp_dict[snp_coord[2]]      
    if output != None:
        if len(missing_rs) == len(snp_coords):
            output["error"] = "Input variant list does not contain any valid RS numbers or coordinates. " + str(output["warning"] if "warning" in output else "")
            return "","",output
        if len(missing_rs) > 0:
            output["warning"] = "Query variant " + " ".join(missing_rs) + " is missing from 1000G (" + genome_build_vars[genome_build]['title'] + ") data. " + str(output["warning"] if "warning" in output else "")
    
    del snp_dict
       
    sorted_snp_rs = snp_rs_dict
    if ifsorted:
        sorted_snp_rs = OrderedDict(sorted(snp_rs_dict.items(),key=customsort))

    #print(sorted_snp_rs)
    return sorted_snp_rs,missing_rs_snp,output

def customsort(key_snp1):
    k = key_snp1[0].split("_")[0].split(':')[1]
    k = int(k)
    return k

def get_vcf_snp_params(snp_pos,snp_coords,genome_build):
     # Sort coordinates and make tabix formatted coordinates
    snp_pos_int = [int(i) for i in snp_pos]
    snp_pos_int.sort()
    tabix_coords=""
    for i in range(len(snp_pos_int)):
        snp_coord_str = [genome_build_vars[genome_build]['1000G_chr_prefix'] + snp_coords[i][1] + ":" + snp_coords[i][2] + "-" + snp_coords[i][2]]
        tabix_coords = tabix_coords+" " + " ".join(snp_coord_str)
    # # Extract 1000 Genomes phased genotypes
    vcf_filePath = "%s/%s%s/%s" % (aws_info['data_subfolder'], genotypes_dir, genome_build_vars[genome_build]['1000G_dir'], genome_build_vars[genome_build]['1000G_file'] % (snp_coords[0][1]))
    vcf_query_snp_file = "s3://%s/%s" % (aws_info['bucket'], vcf_filePath)
    #print("vcf_filePath",vcf_filePath,"snp_coords",snp_coords)
    return vcf_filePath,tabix_coords,vcf_query_snp_file

def LD_calcs(hap, allele_n):
    # Extract haplotypes
    A = hap["00"]
    B = hap["01"]
    C = hap["10"]
    D = hap["11"]
    N = A + B + C + D
    delta = float(A*D-B*C)
    Ms = float((A+C)*(B+D)*(A+B)*(C+D))
    if Ms != 0:
        # D prime
        if delta < 0:
            D_prime = abs(delta/min((A+C)*(A+B), (B+D)*(C+D)))
        else:
            D_prime = abs(delta/min((A+C)*(C+D), (A+B)*(B+D)))
        # R2
        r2 = (delta**2)/Ms
        # Non-effect and Effect Alleles and their Allele Frequencies
        allele1 = str(allele_n["0"])
        allele1_freq = str(round(float(A + C) / N, 3)) if N > float(A + C) else "NA"

        allele2 = str(allele_n["1"])
        allele2_freq = str(round(float(B + D) / N, 3)) if N > float(B + D) else "NA"
        return [r2, D_prime, "=".join([allele1, allele1_freq]), "=".join([allele2, allele2_freq])]

def get_dbsnp_coord(db, chromosome, position,genome_build):
    query_results = db.dbsnp.find_one({"chromosome": str(chromosome), genome_build_vars[genome_build]['position']: str(position)})
    query_results_sanitized = json.loads(json_util.dumps(query_results))
    return query_results_sanitized

def check_same_chromosome(snp_coords,output):
    # Check SNPs are all on the same chromosome
    for i in range(len(snp_coords)):
        if snp_coords[0][1] != snp_coords[i][1]:
            output["error"] = "Not all input variants are on the same chromosome: "+snp_coords[i-1][0]+"=chr" + \
                str(snp_coords[i-1][1])+":"+str(snp_coords[i-1][2])+", "+snp_coords[i][0] + \
                "=chr"+str(snp_coords[i][1])+":"+str(snp_coords[i][2])+". " + str(output["warning"] if "warning" in output else "")
            return(json.dumps(output, sort_keys=True, indent=2))
    return

def check_allele(geno):
    if len(geno[3]) == 1 and len(geno[4]) == 1:
        snp_a1 = geno[3]
        snp_a2 = geno[4]
    elif len(geno[3]) == 1 and len(geno[4]) > 1:
        snp_a1 = "-"
        snp_a2 = geno[4][1:]
    elif len(geno[3]) > 1 and len(geno[4]) == 1:
        snp_a1 = geno[3][1:]
        snp_a2 = "-"
    elif len(geno[3]) > 1 and len(geno[4]) > 1:
        snp_a1 = geno[3][1:]
        snp_a2 = geno[4][1:]

    allele = {"0|0": [snp_a1, snp_a1], "0|1": [snp_a1, snp_a2], "1|0": [snp_a2, snp_a1], "1|1": [
        snp_a2, snp_a2], "0": [snp_a1, "."], "1": [snp_a2, "."], "./.": [".", "."], ".": [".", "."]}
    return allele,snp_a1,snp_a2

def get_head(vcf):
    h = 0
    while vcf[h][0:2] == "##":
        h += 1
    head = vcf[h].strip().split() 
    vcf = vcf[h+1:]
    return vcf, head

def get_geno(vcf,snp):
    vcf,h = get_head(vcf)
    if len(vcf) > 1:
        for i in range(len(vcf)):
            #if vcf[i].strip().split()[2] == snp:
            geno = vcf[i].strip().split()
            geno[0] = geno[0].lstrip('chr')     
    else:
        geno = vcf[0].strip().split()
        geno[0] = geno[0].lstrip('chr')
    return geno

def chunkWindow(pos, window, num_subprocesses):
    if (pos - window <= 0):
        minPos = 0
    else:
        minPos = pos - window
    maxPos = pos + window
    windowRange = maxPos - minPos
    chunks = []
    newMin = minPos
    newMax = 0
    for _ in range(num_subprocesses):
        newMax = newMin + (windowRange / num_subprocesses)
        chunks.append([math.ceil(newMin), math.ceil(newMax)])
        newMin = newMax + 1
    return chunks

# collect output in parallel
def get_output(process):
    return process.communicate()[0].splitlines()