import sys
import os
import json
from timeit import default_timer as timer

from pymongo import MongoClient, ASCENDING
from pymongo.errors import ConnectionFailure
from bson import json_util, ObjectId

def buildRecord(exportFile, gene_id_v26, gene_name_v26, gene_name_v35):
    record = {
        "gene_id_v26": gene_id_v26,
        "gene_name_v26": gene_name_v26,
        "gene_name_v35": gene_name_v35
    } 
    exportFile.write(json.dumps(record) + '\n')
    
def main():
    print("start script")
    start = timer()
    filename_v26 = sys.argv[1]
    print("filename_v26", filename_v26)

    client = MongoClient()
    db = client['LDLink']

    # if export file already exists, delete
    if (os.path.exists("tmp/export.genes.merge.json")):
        print("export.genes.merge.json already exists, deleting...")
        os.remove("tmp/export.genes.merge.json")

    # if debug problematic out files already exist, delete
    if (os.path.exists("tmp/problematic.genes.merge.txt")):
        print("problematic.genes.merge.txt already exists, deleting...")
        os.remove("tmp/problematic.genes.merge.txt")

    # print("parsing and inserting...")

    inserted = 0
    problematic = 0
    multipleGenes = 0
    notFound = 0
    # count = 0

    with open(filename_v26, 'r') as f_v26_in, open("tmp/problematic.genes.merge.txt", 'a') as problematicFile, open("tmp/export.genes.json", 'a') as exportFile:
        for v26_line in f_v26_in:
            v26_json = json.loads(v26_line)
            v26_gene_id = v26_json['gene_id']
            v26_gene_id_split = v26_json['gene_id'].split('.')[0]
            v26_gene_name = v26_json['gene_name']
            print(v26_gene_id_split)
            v35_query = json.loads(json_util.dumps(db.gtex_genes_v35.find({"gene_id": v26_gene_id_split})))
            print("v35_query", v35_query)
            if (len(v35_query) >= 1):
                if (len(v35_query) >= 2):
                    if v35_query[0]['gene_name'] != v35_query[1]['gene_name']:
                        multipleGenes += 1
                        problematic += 1
                        problematicFile.write(str([v26_json['gene_id'], v26_json['gene_name'], v35_query]) + '\n')
                    else:
                        print("NORMAL")
                        inserted += 1
                        v35_query_gene_name = v35_query[0]['gene_name']
                        print(v35_query_gene_name)
                        buildRecord(exportFile, v26_gene_id, v26_gene_name, v35_query_gene_name)
                else:
                    print("NORMAL")
                    inserted += 1
                    v35_query_gene_name = v35_query[0]['gene_name']
                    print(v35_query_gene_name)
                    buildRecord(exportFile, v26_gene_id, v26_gene_name, v35_query_gene_name)
            else:
                notFound += 1
                problematic += 1
                print("NOT FOUND")
                v35_query_gene_name = "NA"
                print(v35_query_gene_name)
                buildRecord(exportFile, v26_gene_id, v26_gene_name, v35_query_gene_name)
            

    end = timer()	
    print("TIME ELAPSED:", str(end - start) + "(s)")	
    print("# inserted", inserted)
    print("# multipleGenes", multipleGenes)
    print("# notFound", notFound)
            

if __name__ == "__main__":
    main()