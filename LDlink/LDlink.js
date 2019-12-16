var ldlink_version = "Version 3.8";


// var restService = {protocol:'http',hostname:document.location.hostname,fqn:"nci.nih.gov",port:9090,route : "LDlinkRestWeb"}
// var restServerUrl = restService.protocol + "://" + restService.hostname + "/"+ restService.route;
var restService = {protocol: window.location.protocol, hostname: window.location.host, pathname: window.location.pathname, route: 'LDlinkRestWeb'}
var restServerUrl = restService.protocol + "//" + restService.hostname + restService.pathname + restService.route;

var dropdowns = ["assoc-chromosome", "assoc-position", "assoc-p-value"];

var populations={AFR:{fullName:"African",subPopulations:{YRI:"Yoruba in Ibadan, Nigera",LWK:" Luhya in Webuye, Kenya",GWD:" Gambian in Western Gambia",MSL:"  Mende in Sierra Leone",ESN:"  Esan in Nigera",ASW:" Americans of African Ancestry in SW USA",ACB:"  African Carribbeans in Barbados"}},AMR:{fullName:"Ad Mixed American",subPopulations:{MXL:"  Mexican Ancestry from Los Angeles, USA",PUR:" Puerto Ricans from Puerto Rico",CLM:" Colombians from Medellin, Colombia",PEL:" Peruvians from Lima, Peru"}},EAS:{fullName:"East Asian",subPopulations:{CHB:" Han Chinese in Bejing, China",JPT:" Japanese in Tokyo, Japan",CHS:" Southern Han Chinese",CDX:" Chinese Dai in Xishuangbanna, China",KHV:"  Kinh in Ho Chi Minh City, Vietnam"}},EUR:{fullName:"European",subPopulations:{CEU:" Utah Residents from North and West Europe",TSI:"  Toscani in Italia",FIN:"  Finnish in Finland",GBR:" British in England and Scotland",IBS:"  Iberian population in Spain"}},SAS:{fullName:"South Asian",subPopulations:{GIH:"  Gujarati Indian from Houston, Texas",PJL:"  Punjabi from Lahore, Pakistan",BEB:"  Bengali from Bangladesh",STU:"  Sri Lankan Tamil from the UK",ITU:" Indian Telugu from the UK"}}};
var ldPairData={corr_alleles:["rs2720460(A) allele is correlated with rs11733615(C) allele","rs2720460(G) allele is correlated with rs11733615(T) allele"],haplotypes:{hap1:{alleles:"AC",count:"155",frequency:"0.686"},hap2:{alleles:"GC",count:"40",frequency:"0.177"},hap3:{alleles:"GT",count:"29",frequency:"0.128"},hap4:{alleles:"AT",count:"2",frequency:"0.009"}},snp1:{allele_1:{allele:"A",count:"157",frequency:"0.695"},allele_2:{allele:"G",count:"69",frequency:"0.305"},coord:"chr4:104054686",rsnum:"rs2720460"},snp2:{allele_1:{allele:"C",count:"195",frequency:"0.863"},allele_2:{allele:"T",count:"31",frequency:"0.137"},coord:"chr4:104157164",rsnum:"rs11733615"},statistics:{chisq:"67.271",d_prime:"0.9071",p:"0.0",r2:"0.2977"},two_by_two:{cells:{c11:"155",c12:"2",c21:"40",c22:"29"},total:"old - 227"}};
var ldhapData={footer:[{Count:127,Frequency:.588,Haplotype:"GCATGGCGTTGGGG"},{Count:40,Frequency:.1852,Haplotype:"GGGGAGCGTTGGGG"},{Count:23,Frequency:.1065,Haplotype:"GCGGAGCGTTGGGG"},{Count:11,Frequency:.0509,Haplotype:"TGGGAGCGTTGGGG"},{Count:8,Frequency:.037,Haplotype:"GCATAGCGTTGGGG"},{Count:7,Frequency:.0324,Haplotype:"TGGGGATAGCAAAG"}],rows:[{Alleles:"G=0.917, T=0.083",Coord:"chr4:104050980",RS:"rs2720457",Haplotypes:["G","G","G","T","G","T"]},{Alleles:"C=0.732, G=0.269",Coord:"chr4:104052963",RS:"rs2720458",Haplotypes:["C","G","C","G","C","G"]},{Alleles:"A=0.625, G=0.375",Coord:"chr4:104055748",RS:"rs2720461",Haplotypes:["A","G","G","G","A","G"]},{Alleles:"T=0.625, G=0.375",Coord:"chr4:104056210",RS:"rs2720462",Haplotypes:["T","G","G","G","T","G"]},{Alleles:"G=0.62, A=0.38",Coord:"chr4:104052068",RS:"rs7661201",Haplotypes:["G","A","A","A","A","G"]},{Alleles:"G=0.968, A=0.032",Coord:"chr4:104055722",RS:"rs2623063",Haplotypes:["G","G","G","G","G","A"]},{Alleles:"C=0.968, T=0.032",Coord:"chr4:104057121",RS:"rs2623062",Haplotypes:["C","C","C","C","C","T"]},{Alleles:"G=0.968, A=0.032",Coord:"chr4:104057248",RS:"rs2720463",Haplotypes:["G","G","G","G","G","A"]},{Alleles:"T=0.968, G=0.032",Coord:"chr4:104057887",RS:"rs2711901",Haplotypes:["T","T","T","T","T","G"]},{Alleles:"T=0.968, C=0.032",Coord:"chr4:104051132",RS:"rs2623082",Haplotypes:["T","T","T","T","T","C"]},{Alleles:"G=0.968, A=0.032",Coord:"chr4:104058596",RS:"rs2711900",Haplotypes:["G","G","G","G","G","A"]},{Alleles:"G=0.968, A=0.032",Coord:"chr4:104050510",RS:"rs2720456",Haplotypes:["G","G","G","G","G","A"]},{Alleles:"G=0.968, A=0.032",Coord:"chr4:104050326",RS:"rs2720455",Haplotypes:["G","G","G","G","G","A"]},{Alleles:"G=1.0, A=0.0",Coord:"chr4:104059542",RS:"rs2243682",Haplotypes:["G","G","G","G","G","G"]}]};
var ldassocData=[{RS_Number:"rs75563749",Coord:"chr3:171031233",Alleles:"(A/T)",MAF:.1983,Distance:348304,Dprime:.0512,R2:.0021,Correlated_Alleles:"= , =",RegulomeDB:6,Functional_Class:"NA"},{RS_Number:"rs76189435",Coord:"chr3:170980080",Alleles:"(C/G)",MAF:.0527,Distance:-51153,Dprime:.622,R2:.0871,Correlated_Alleles:"= , =",RegulomeDB:"2b",Functional_Class:"NA"},{RS_Number:"rs76140932",Coord:"chr3:170980434",Alleles:"(A/G)",MAF:.0539,Distance:-50799,Dprime:.6073,R2:.085,Correlated_Alleles:"= , =",RegulomeDB:"2b",Functional_Class:"NA"},{RS_Number:"rs76735261",Coord:"chr3:170981252",Alleles:"(G/C)",MAF:.0539,Distance:-49981,Dprime:.6073,R2:.085,Correlated_Alleles:"= , =",RegulomeDB:5,Functional_Class:"NA"},{RS_Number:"rs1158564",Coord:"chr3:171002654",Alleles:"(A/G)",MAF:.4439,Distance:-28579,Dprime:.866,R2:.2324,Correlated_Alleles:"A=A,G=T",RegulomeDB:"2b",Functional_Class:"NA"},{RS_Number:"rs4894756",Coord:"chr3:171002036",Alleles:"(G/A)",MAF:.3806,Distance:-29197,Dprime:.8732,R2:.3069,Correlated_Alleles:"G=A,A=T",RegulomeDB:4,Functional_Class:"NA"},{RS_Number:"rs200296423",Coord:"chr3:170969849",Alleles:"(TGCG/-)",MAF:.0475,Distance:-61384,Dprime:.5965,R2:.0718,Correlated_Alleles:"= , =",RegulomeDB:".",Functional_Class:"NA"},{RS_Number:"rs377580557",Coord:"chr3:171001114",Alleles:"(TTTTCTC/-)",MAF:.0445,Distance:-30119,Dprime:.67,R2:.0846,Correlated_Alleles:"= , =",RegulomeDB:".",Functional_Class:"NA"},{RS_Number:"rs377580557",Coord:"chr3:171001114",Alleles:"(TTTTCTC/-)",MAF:.0445,Distance:-30119,Dprime:.67,R2:.0846,Correlated_Alleles:"= , =",RegulomeDB:".",Functional_Class:"NA"},{RS_Number:"rs6444976",Coord:"chr3:171002143",Alleles:"(G/C)",MAF:.3808,Distance:-29090,Dprime:.8731,R2:.3066,Correlated_Alleles:"G=A,C=T",RegulomeDB:4,Functional_Class:"NA"},{RS_Number:"rs13090306",Coord:"chr3:170969666",Alleles:"(A/C)",MAF:.4163,Distance:-61567,Dprime:.5359,R2:.0996,Correlated_Alleles:"= , =",RegulomeDB:5,Functional_Class:"NA"}];
// var ldtraitData = {
//     "warnings": [
//         {
//             "rs_number_query": "rs2182115",
//             "rs_number": "rs116705532", 
//             "trait": "interleukin 4 measurement",
//             "position": "chr1:113705169", 
//             "comment": "Variant not found in GWAS catalog within window.", 
//             "rs_number_link": "<a>rs116705532</a>", 
//             "position_link": "<a>chr1:113705169</a>"
//         }
//     ],
//     "details": [ 
//         {   
//             "rs_number_query": "rs2182115",
//             "rs_number": "rs773430", 
//             "trait": "systolic blood pressure",
//             "position": "chr1:113536047", 
//             "comment": "Variant found in GWAS catalog within window.", 
//             "rs_number_link": "<a>rs773430</a>", 
//             "position_link": "<a>chr1:113536047</a>"
//         }
//     ]
// };
var snpclipData = {"warnings":[{"rs_number":"rs12980602","position":"chr19:39752820","alleles":"T=0.763, C=0.237","comment":"SNP kept","rs_number_link":"<a>rs12980602</a>","position_link":"<a>chr19:39752820</a>"},{"rs_number":"rs35963157","position":"chr19:39745695","alleles":"-=0.338, C=0.662","comment":"SNP in LD with rs11322783 (R2=0.1887), SNP removed","rs_number_link":"<a>rs35963157</a>","position_link":"<a>chr19:39745695</a>"}],"details":[{"rs_number":"rs12980602","position":"chr19:39752820","alleles":"T=0.763, C=0.237","comment":"SNP kept","rs_number_link":"<a>rs12980602</a>","position_link":"<a>chr19:39752820</a>"},{"rs_number":"rs35963157","position":"chr19:39745695","alleles":"-=0.338, C=0.662","comment":"SNP in LD with rs11322783 (R2=0.1887), SNP removed","rs_number_link":"<a>rs35963157</a>","position_link":"<a>chr19:39745695</a>"}]};
var snpchipData = {"snpchip":[{"rs_number":"<a href=\"http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs=505066\" target=\"rs_number_rs505066\">rs505066</a>","chromosome":"1","position":"<a href=\"http://genome.ucsc.edu/cgi-bin/hgTracks?db=hg19&position=chr1%3A96882421-96882921&snp142=pack&hgFind.matches=rs505066\" target=\"coord_chr1:96882671\">96882671</a>","map":["&nbsp;","&nbsp;","&nbsp;","&nbsp;","&nbsp;","X","&nbsp;","&nbsp;","&nbsp;","&nbsp;","&nbsp;","X","X","X","&nbsp;","&nbsp;","&nbsp;","&nbsp;","&nbsp;","&nbsp;","&nbsp;","&nbsp;","&nbsp;"]},{"rs_number":"<a href=\"http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs=4478775\" target=\"rs_number_rs4478775\">rs4478775</a>","chromosome":"1","position":"<a href=\"http://genome.ucsc.edu/cgi-bin/hgTracks?db=hg19&position=chr1%3A177769847-177770347&snp142=pack&hgFind.matches=rs4478775\" target=\"coord_chr1:177770097\">177770097</a>","map":["&nbsp;","X","&nbsp;","X","&nbsp;","X","&nbsp;","&nbsp;","&nbsp;","&nbsp;","X","X","X","X","&nbsp;","&nbsp;","&nbsp;","&nbsp;","&nbsp;","&nbsp;","&nbsp;","&nbsp;","X"]},{"rs_number":"<a href=\"http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs=561634\" target=\"rs_number_rs561634\">rs561634</a>","chromosome":"1","position":"<a href=\"http://genome.ucsc.edu/cgi-bin/hgTracks?db=hg19&position=chr1%3A177895513-177896013&snp142=pack&hgFind.matches=rs561634\" target=\"coord_chr1:177895763\">177895763</a>","map":["&nbsp;","X","&nbsp;","X","&nbsp;","X","&nbsp;","&nbsp;","&nbsp;","&nbsp;","X","X","X","X","&nbsp;","&nbsp;","&nbsp;","&nbsp;","&nbsp;","&nbsp;","&nbsp;","&nbsp;","X"]},{"rs_number":"<a href=\"http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs=2820292\" target=\"rs_number_rs2820292\">rs2820292</a>","chromosome":"1","position":"<a href=\"http://genome.ucsc.edu/cgi-bin/hgTracks?db=hg19&position=chr1%3A201784037-201784537&snp142=pack&hgFind.matches=rs2820292\" target=\"coord_chr1:201784287\">201784287</a>","map":["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"]}],"headers":[{"code":"A_AFR","platform":"Affymetrix Axiom GW AFR"},{"code":"A_ASI","platform":"Affymetrix Axiom GW ASI"},{"code":"A_EAS","platform":"Affymetrix Axiom GW EAS"},{"code":"A_EUR","platform":"Affymetrix Axiom GW EUR"},{"code":"A_Hu","platform":"Affymetrix Axiom GW Hu"},{"code":"A_Hu-CHB","platform":"Affymetrix Axiom GW Hu-CHB"},{"code":"A_LAT","platform":"Affymetrix Axiom GW LAT"},{"code":"A_Onco","platform":"Affymetrix OncoScan"},{"code":"A_OncoCNV","platform":"Affymetrix OncoScan CNV"},{"code":"A_SNP6.0","platform":"Affymetrix SNP 6.0"},{"code":"I_CardioMetab","platform":"Illumina Cardio-MetaboChip"},{"code":"I_1M-D","platform":"Illumina Human1M-Duov3"},{"code":"I_1M","platform":"Illumina Human1Mv1"},{"code":"I_Exon510S","platform":"Illumina HumanExon510Sv1"},{"code":"I_O1S-8","platform":"Illumina HumanOmni1S-8v1"},{"code":"I_O2.5-4","platform":"Illumina HumanOmni2.5-4v1"},{"code":"I_O2.5-8","platform":"Illumina HumanOmni2.5-8v1.2"},{"code":"I_O2.5E-8v1","platform":"Illumina HumanOmni2.5Exome-8v1"},{"code":"I_O2.5E-8v1.1","platform":"Illumina HumanOmni2.5Exome-8v1.1"},{"code":"I_O2.5E-8v1.2","platform":"Illumina HumanOmni2.5Exome-8v1.2"},{"code":"I_O5-4","platform":"Illumina HumanOmni5-4v1"},{"code":"I_O5E-4","platform":"Illumina HumanOmni5Exome-4v1"},{"code":"I_ME-Global-8","platform":"Illumina Infinium Multi-Ethnic Global-8"}]};
var snpchipReverseLookup = [];
var ldTraitRaw;
var ldClipRaw;
var modules = [ "ldassoc", "ldhap", "ldmatrix", "ldpair", "ldpop", "ldproxy", "ldtrait", "snpclip", "snpchip", "apiaccess" ];


Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


$(document).ready(function() {
    // Close URL change alert banner after 5 seconds
    $("#url-alert").delay(5000).slideUp(600, function() {
        $(this).alert('close');
    });

    // Load news text from news.html to news-container div
    $.get("news.html", function (data) {
        $("#news-container").append(data);
    });
    
    $('#progressbar').progressbar();
    //$('#progressbar').progressbar('setPosition', 85);
    //$('#ldassoc-progressbar').progressbar('reset');
    $('#ldassoc-progressbar').on("positionChanged", function (e) {
        console.log(e.position);
        console.log(e.percent);
    });

    $(':file').change(function(){
        var file = this.files[0];
        var name = file.name;
        var size = file.size;
        var type = file.type;
        //Your validation
        console.dir(file);
    });
    $.each(dropdowns, function(i, id) {
        $("#"+id+" > .dropdown-menu").on("click", "li a", function(){
            createCookie(id, $(this).text(), 10);
            setBootstrapSelector(id, $(this).text());
        });
    });
    $("#assoc-region > .dropdown-menu li a").click(function(e){
        $("#assoc-region > .btn:first-child").html($(this).text() + '&nbsp;<span class="caret"></span>');
        $("#assoc-region > .btn:first-child").val($(this).text().toLowerCase());
        $("#region-gene-container").hide();
        $("#region-region-container").hide();
        $("#region-variant-container").hide();
        console.log(e.target.id);
        switch($(this).text()) {
            case "Gene":
                $("#region-gene-name").val('');
                // $("#region-gene-base-pair-window").val('');
                $("#region-gene-index").val('');
                $("#region-region-start-coord").val('');
                $("#region-region-end-coord").val('');
                $("#region-region-index").val('');
                $("#region-variant-index").val('');
                // $("#region-variant-base-pair-window").val('');
                $("#region-gene-container").show();
                break;
            case "Region":
                $("#region-gene-name").val('');
                // $("#region-gene-base-pair-window").val('');
                $("#region-gene-index").val('');
                $("#region-region-start-coord").val('');
                $("#region-region-end-coord").val('');
                $("#region-region-index").val('');
                $("#region-variant-index").val('');
                // $("#region-variant-base-pair-window").val('');
                $("#region-region-container").show();
                break;
            case "Variant":
                $("#region-gene-name").val('');
                // $("#region-gene-base-pair-window").val('');
                $("#region-gene-index").val('');
                $("#region-region-start-coord").val('');
                $("#region-region-end-coord").val('');
                $("#region-region-index").val('');
                $("#region-variant-index").val('');
                // $("#region-variant-base-pair-window").val('');
                $("#region-variant-container").show();
                break;
        }
    });

    $('#ldassoc').prop('disabled', true);

    // reset apiaccess form
    $(".apiaccess-done").click(function(e) {
        $("#apiaccess-reset").click();
        $("#apiaccess-new-user").modal('hide');
        $("#apiaccess-existing-user").modal('hide');

        $('#apiblocked-form').show();
        $('#apiblocked').show();
        $('#apiblocked-submit-message').hide();
        $('#apiblocked-done').val("Cancel");

        $("#apiblocked-reset").click();
        $("#apiaccess-blocked-user").modal('hide');
    });

    $("#example-gwas").click(function(e){
    //   console.log("Use example GWAS data.");
      var useEx = document.getElementById('example-gwas');
      // var exampleHeaders = ['A', 'B', 'C'];
      if (useEx.checked){
        var url = restServerUrl + "/ldassoc_example";
        var ajaxRequest = $.ajax({
            type : 'GET',
            url : url,
            contentType : 'application/json' // JSON
        }).success(function(response) {
          var data = JSON.parse(response);
          $('#ldassoc-file-label').val(data.filename);
          populateAssocDropDown(data.headers);
          $("#header-values").show();
          $("#assoc-chromosome > button").val("chr");
          $("#assoc-chromosome > button").text("Chromosome: chr column");
          $("#assoc-position > button").val("pos");
          $("#assoc-position > button").text("Position: pos column");
          $("#assoc-p-value > button").val("p");
          $("#assoc-p-value > button").text("P-Value: p column");
          $('#ldassoc-file').prop('disabled', true);
          $('#ldassoc').removeAttr('disabled');
        });

        $('#region-gene-name').val('');
        $('#region-gene-index').val('');
        $('#region-variant-index').val('');

        $("#assoc-region > .btn:first-child").val("Region".toLowerCase());
        $("#assoc-region > .btn:first-child").html("Region" + '&nbsp;<span class="caret"></span>');

        $("#region-gene-container").hide();
        $("#region-region-container").hide();
        $("#region-variant-container").hide();
        $("#region-region-container").show();
        $("#region-region-start-coord").val("chr8:128289591");
        $("#region-region-end-coord").val("chr8:128784397");
        $("#region-region-index").val("rs7837688");
        // console.log($("#region-region-start-coord").val());
        // console.log($("#region-region-end-coord").val());
        // console.log($("#region-region-index").val());

        $("#ldassoc-population-codes").val('');
        refreshPopulation([],"ldassoc");
        $("#ldassoc-population-codes").val(["CEU"]);
        refreshPopulation(["CEU"],"ldassoc");
        // console.log($("#ldassoc-population-codes").val());
      }else{
        $('#ldassoc-file').prop('disabled', false);
        $('#ldassoc').prop('disabled', true);
        $("#assoc-chromosome > button").val('');
        $("#assoc-chromosome > button").html('Select Chromosome&nbsp;<span class="caret"></span>');
        $("#assoc-position > button").val('');
        $("#assoc-position > button").html('Select Position&nbsp;<span class="caret"></span>');
        $("#assoc-p-value > button").val('');
        $("#assoc-p-value > button").html('Select P-Value&nbsp;<span class="caret"></span>');

        $('#ldassoc-file-label').val('');
        populateAssocDropDown([]);
        $("#header-values").hide();
        $('#ldassoc-file').val('');
        // console.log("Don't use example GWAS data.");
        $("#region-gene-container").hide();
        $("#region-region-container").hide();
        $("#region-variant-container").hide();
        $("#assoc-region > .btn:first-child").val('');
        $("#assoc-region > .btn:first-child").html('Select Region<span class="caret"></span>');
        $("#region-region-start-coord").val('');
        $("#region-region-end-coord").val('');
        $("#region-region-index").val('');
        $("#ldassoc-population-codes").val('');
        refreshPopulation([],"ldassoc");
      }
    });

    updateVersion(ldlink_version);
    //addValidators();
    $('#ldlink-tabs').on('click', 'a', function(e) {
        //console.warn("You clicked a tab");
        //console.info("Check for an attribute called data-url");
        //If data-url use that.
        var currentTab = e.target.id.substr(0, e.target.id.search('-'));
        //console.log(currentTab);
        var last_url_params = $("#"+currentTab+"-tab-anchor").attr("data-url-params");
        //console.log("last_url_params: "+last_url_params);
        if(typeof last_url_params === "undefined") {
            window.history.pushState({},'', "?tab="+currentTab);
        } else {
            window.history.pushState({},'', "?"+last_url_params);
        }

    });

    setupLDtraitControls();
    setupSNPclipControls();
    setupSNPchipControls();
    showFFWarning();

    createAssocTable();
    createPopTable();
    createProxyTable();
    createTraitDetailsTable();
    createTraitWarningsTable();
    var new_assoc_data = {
        "aaData": [
            ["rs75563749","chr7","24958977","(C/T)","0.2037",-726,"0.234","0.234","C-C","0.0", "7","HaploReg link","NA"],
            ["rs95696732","chr4","24958977","(C/T)","0.2037",-726,"1.0","1.0","T-T","0.0","7","HaploReg link","NA"]
        ]
    };

    var new_proxy_data = {
        "aaData": [
            ["rs125","chr7","24958977","(C/T)","0.2037",-726,"1.0","1.0","C-C,T-T","7","HaploReg link","NA"],
            ["rs128","chr7","24958977","(C/T)","0.2037",-726,"1.0","1.0","C-C,T-T","7","HaploReg link","NA"],
            [".","chr4","24958977","(C/T)","0.2037",-726,"1.0","1.0","C-C,T-T","7","HaploReg link","NA"]
        ]
    };

    // var new_trait_data = {
    //     "aaData": [
    //         ["cognitive function measurement","rs77052120","chr1:110765398","Variant found in GWAS catalog within window."],
    //     ]
    // };
    
    RefreshTable('#new-ldassoc', new_assoc_data);
    RefreshTable('#new-ldproxy', new_proxy_data);

    $('[data-toggle="popover"]').popover();

    loadHelp();

    // Apply Bindings
    ko.applyBindings(ldpairModel, document
            .getElementById('ldpair-results-container'));
    ko.applyBindings(ldhapModel, document
            .getElementById('ldhap-results-container'));
    // ko.applyBindings(ldtraitModel, document
    //     .getElementById('ldtrait-results-container'));
    ko.applyBindings(snpclipModel, document
            .getElementById('snpclip-results-container'));
    ko.applyBindings(snpchipModel, document
            .getElementById('snpchip-results-container'));

    $.each(modules, function(key, id) {
        buildPopulationDropdown(id + "-population-codes");
        $("#"+ id + "-results-container").hide();
        $('#'+ id + '-message').hide();
        $('#'+ id + '-message-warning').hide();
        $('#'+ id + "-loading").hide();
    });
    
    $('#apiblocked-loading').hide();
    $('#apiblocked-message').hide();
    $('#apiblocked-message-warning').hide();

    $('.ldlinkForm').on('submit', function(e) {
        calculate(e);
    });

    $(".help-anchor-link").on('click', function(e) { 
        var tab = e.target.hash;
        $('#help-tab-anchor').click();
        setTimeout(function() {
            window.location = tab;
        }, 500);
    });

    $(".anchor-link").on('click', function(e) { 
        var tab = $(this).attr('dest');
        $('#' + tab + '-tab-anchor').click();
    });

    setupTabs();
    autoCalculate();
    createFileSelectEvent();
    createEnterEvent();
    initAPIExamples();
    // Google Maps API
    initMap();
    // export LDpop map dropdown buttons
    $("#ldpop-LD-downloadPNG").click(function(e) {
        e.preventDefault();
        // console.log("ldpop LD map export png");
        exportMap(1, "LD", "png");
    });
    $("#ldpop-LD-downloadJPEG").click(function(e) {
        e.preventDefault();
        // console.log("ldpop LD export jpeg");
        exportMap(1, "LD", "jpeg");
    });
    // export variant 1 allele freq map
    $("#ldpop-AFvar1-downloadPNG").click(function(e) {
        e.preventDefault();
        // console.log("ldpop variant 1 allele freq map export png");
        exportMap(2, "AF", "png");
    });
    $("#ldpop-AFvar1-downloadJPEG").click(function(e) {
        e.preventDefault();
        // console.log("ldpop variant 1 allele freq map export jpeg");
        exportMap(2, "AF", "jpeg");
    });
    // export variant 2 allele freq map
    $("#ldpop-AFvar2-downloadPNG").click(function(e) {
        e.preventDefault();
        // console.log("ldpop variant 2 allele freq map export png");
        exportMap(3, "AF", "png");
    });
    $("#ldpop-AFvar2-downloadJPEG").click(function(e) {
        e.preventDefault();
        // console.log("ldpop variant 2 allele freq map export jpeg");
        exportMap(3, "AF", "jpeg");
    });

    // LDtrait change R2/D' threshold label
    $("#ldtrait_ld_r2").click(function(e){
        console.log("R2");
        $("#ldtrait_r2_d_threshold_label").html("R<sup>2</sup>:");
    });
    $("#ldtrait_ld_d").click(function(e){
        console.log("D");
        $("#ldtrait_r2_d_threshold_label").html("D':");
    });
});

// Set file support trigger
$(document).on('change','.btn-snp :file', createFileSelectTrigger);
// ldAssoc File Change
$(document).on('change','.btn-csv-file :file', createFileSelectTrigger);

// wait for svg genreation subprocess complete before enabling plot export menu button
function checkFile(id, fileURL, retries) {
    // add countdown retries here to prevent hang up of infinite loop
    if (retries > 0) {
        var countdown = retries - 1
        $.ajax({
            // type : 'GET',
            url : 'status' + fileURL + '?_=' + new Date().getTime(),
            contentType : 'application/json', // JSON
            cache: false
        }).done(function(response) {
            if (response) {
                $('#' + id + "-menu1").html('Export Plot <span class="caret"></span>');
                $('#' + id + "-menu1").prop('disabled', false);
            } else {
                setTimeout(function() { 
                    checkFile(id, fileURL, countdown); 
                }, 5000);
            } 
        });
    } else {
        $('#' + id + "-menu1").html('Export Failed');
        $('#' + id + "-menu1").prop('disabled', true);
    }
}
function initAPIExamples() {
    $(".apiaccess-examples").each( function(index) { 
        $(".apiaccess-examples")[index].innerText = $(".apiaccess-examples")[index].innerText.replace('https://ldlink.nci.nih.gov', window.location.origin);
    });
}
function setBootstrapSelector(id, value) {
    var str = id.substr(6);
    str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });
    var msg = str+": "+value+" column";
    $("#"+id+" > .btn:first-child").text(msg);
    $("#"+id+" > .btn:first-child").val(value);
}
function resetBootstrapSelector(id) {
    var str = id.substr(6);
    str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });
    var msg = "Select "+str+'&nbsp;<span class="caret"></span>';
    $("#"+id+" > .btn:first-child").html(msg);
    $("#"+id+" > .btn:first-child").val("");
}

function createFileSelectTrigger() {
    // console.log("createFileSelectTrigger");
    var input = $(this), numFiles = input.get(0).files ?
    input.get(0).files.length : 1, label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [numFiles, label]);
}

function createEnterEvent() {
    $("body").keypress(function(e) {
        // Look for a return value
        var code = e.keyCode || e.which;
        if (code == 13) { // User pressed return key
            //console.dir($(e.target));
            if ($(e.target).attr('role') == 'document') {
                //alert("You pressed return.  Let's find what is the active tab...");
                var active_tab = $("div.tab-pane.active").attr('id');
                //console.log(active_tab);
                //console.log("Trigger a submit");
                var tab = active_tab.split("-");
                var formId = tab[0] + "Form";
                var pop_codes = tab[0]+"-population-codes";
                //console.log($("#"+pop_codes).parent().find("div.btn-group").hasClass("open"));
                $("#"+pop_codes).parent().find("div.btn-group").removeClass("open");
                $("#"+formId).trigger("submit");
            }
        }
    });
}

function uploadFile2() {


    restService.route = 'LDlinkRestWeb';
    restServerUrl = restService.protocol + "//" + restService.hostname + restService.pathname + restService.route;

    var filename = $("#ldassocFile").val();
    // console.log(filename);

    var fileInput = document.getElementById('ldassoc-file');
    var file = fileInput.files[0];
    var formData = new FormData();
    //console.log("formData before");
    //console.dir(formData);
    formData.append('ldassocFile', file);
    //console.log("formData after");
    //console.dir(formData);
    // Display the keys
    //  for (var key of formData.keys()) {
    //     console.log(key);
    //  }
    $.ajax({
        url: restServerUrl+'/upload',  //Server script to process data
        type: 'POST',
        xhr: function() {  // Custom XMLHttpRequest
            var myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){ // Check if upload property exists
                myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
            }
            return myXhr;
        },
        //Ajax events
        beforeSend: beforeSendHandler,
        success: completeHandler,
        error: errorHandler,
        // Form data
        data: formData,
        //Options to tell jQuery not to process data or worry about content-type.
        cache: false,
        contentType: false,
        processData: false
    });
}

function progressHandlingFunction(e){

    if(e.lengthComputable){
        //$('progress').attr({value:e.loaded,max:e.total});
        var percent = Math.floor(e.loaded/e.total*100);
        $( "#progressbar" ).progressbar({value: percent});
        $( "#progressbar" ).css('width', percent+"%");
        $( "#progressbar" ).html(percent+'% Completed');

    }
}
function beforeSendHandler() {
    console.warn('beforeSendHandler');
    var percent = 0;
    $( "#progressbar" ).css('width', percent+"%");
    $( "#progressbar" ).html(percent+'% Completed');
    $('#ldassoc-file-container').hide();
    $('#progressbar').parent().show();
}
function completeHandler() {
    console.warn('completeHandler');
    $('#progressbar').parent().hide();
    $('#ldassoc-file-container').fadeIn(1000);
    // enable calculate button only when file is successfully uploaded
    $('#ldassoc').removeAttr('disabled');
}
function errorHandler(e) {
    showCommError(e);
    console.warn('errorHandler');
    $('#progressbar').parent().hide();
    $('#ldassoc-file-container').fadeIn(1000);
    console.error("Comm Error");
    console.dir(e);
}

function showCommError(e) {
    $('#myModal').find('.modal-title').html(e.status + " - " + e.statusText);
    $('#myModal').find('.modal-body').html(e.responseText);
    // $('#myModal').find('.modal-body').append("\n File uploaded may have exceeded the size limit.");
    $("#myModal").modal();
}

function createFileSelectEvent() {
    // Add file select file listener
    $('.btn-snp :file').on('fileselect', function(event, numFiles, label) {
        // console.log(label);
        $(this).parents('.input-group').find(':text').val(label);
        populateTextArea(event, numFiles, label);

    });
    //Customize for ldAssoc
    $('.btn-csv-file :file').on('fileselect', function(event, numFiles, label) {
        // console.log(label);
        $(this).parents('.input-group').find(':text').val(label);
        // console.log("Event");
        populateHeaderValues(event, numFiles, label);
        uploadFile2();
        $("#header-values").show();
        //Changing loadCSVFile because the file size is 722Meg
        //loadCSVFile(event);
    });
}

function fileUpload(fieldName, buttonName){

    restService.route = 'LDlinkRestWeb/load';
    //restServerUrl = restService.protocol + "//" + restService.hostname + restService.pathname + restService.route;
    uploadFile(fieldName, buttonName);
}

function readSingleFile(evt) {
    //Retrieve the first (and only!) File from the FileList object
    var f = evt.target.files[0];
    if (f) {
      var r = new FileReader();
      r.onload = function(e) {
        // console.log( "Got the file.n"
        //       +"name: " + f.name + "n"
        //       +"type: " + f.type + "n"
        //       +"size: " + f.size + " bytesn"
        //       + "starts with: "
        // );

        var contents = e.target.result;
        var defaults = {
            separator:' ',
            delimiter:' ',
            headers:true
        };
        var data = $.csv.toObjects(contents, defaults);
        console.dir(data);
      }
      r.readAsText(f);
    } else {
      alert("Failed to load file");
    }
  }/*
Action item:

*/
function loadCSVFile(event) {
    readSingleFile(event);
    console.warn("Load CSV parse.  Let's take a look at what we got");
    alert("Hello");
    var id = event.target.id;
    if (window.FileReader) {

        var input = event.target;
        var reader = new FileReader();
        reader.onload = function() {
            var text = reader.result;
            alert(text);
            var data = $.csv.toObjects(text);
            alert(text);
            console.dir(data);
        };
    } else {
        console.warn('FileReader not supported');
        return;
    }
}

function createAssocTable() {

    var ldassocTable = $('#new-ldassoc').DataTable( {
        "bPaginate": true,
        "bJQueryUI": false,  // ThemeRoller
        "bLengthChange": true,
        "bFilter": true,
        "bSort": true,
        "bInfo": true,
        "bAutoWidth": true,
        "bProcessing": false,
        "deferRender": false,
        "order": [[ 9, "asc" ], [ 5, "asc"]], //Order desc on DPrime
        "columnDefs": [
            {
                "render": function ( data, type, row ) {
                    return ldproxy_rs_results_link(data, type, row);
                },
                "targets": 0
            },
            {
                "render": function ( data, type, row ) {
                    //Remove 'chr' from the chromosome
                    return data.substring(3);
                },
                "targets": 1
            },
            {
                "render": function ( data, type, row ) {
                    return ldproxy_position_link(data, type, row);
                },
                "targets": 2
            },
            {
                "render": function ( data, type, row ) {
                    return ldproxy_regulome_link(data, type, row);
                },
                "targets": 10
            },
            {
                "render": function ( data, type, row ) {
                    return ldproxy_haploreg_link(data, type, row);
                },
                "targets": 11
            },
            { className: "dt-body-center", "targets": [ 1, 10, 11 ] }
        ]
    });

}

function createPopTable() {

    var ldpopTable = $('#new-ldpop').DataTable( {
        "aaSorting": [],  /* Disable initial sort */
        "bPaginate": false,
        "bJQueryUI": false,  // ThemeRoller
        "bLengthChange": false,
        "bFilter": true,
        "bSort": true,
        "bInfo": true,
        "bAutoWidth": true,
        "bProcessing": false,
        "deferRender": false,
        "columnDefs": [
            {
                "render": function ( data, type, row ) {
                    // Provide link to LDpair in final row
                    return ldpop_ldpair_results_link(data, type, row);
                },
                "targets": 6
            },
            { 
                className: "dt-head-center", 
                className: "dt-body-center",
                "targets": [ 0, 1, 2, 3, 4, 5, 6 ] 
            }
        ]
    });

}

function createProxyTable() {

    var ldproxyTable = $('#new-ldproxy').DataTable( {
        "bPaginate": true,
        "bJQueryUI": false,  // ThemeRoller
        "bLengthChange": true,
        "bFilter": true,
        "bSort": true,
        "bInfo": true,
        "bAutoWidth": true,
        "bProcessing": false,
        "deferRender": false,
        "order": [[ 7, "desc" ], [ 5, "desc"]], //Order desc on DPrime
        "columnDefs": [
            {
                "render": function ( data, type, row ) {
                    return ldproxy_rs_results_link(data, type, row);
                },
                "targets": 0
            },
            {
                "render": function ( data, type, row ) {
                    //Remove 'chr' from the chromosome
                    return data.substring(3);
                },
                "targets": 1
            },
            {
                "render": function ( data, type, row ) {
                    return ldproxy_position_link(data, type, row);
                },
                "targets": 2
            },
            {
                "render": function ( data, type, row ) {
                    return ldproxy_regulome_link(data, type, row);
                },
                "targets": 9
            },
            {
                "render": function ( data, type, row ) {
                    return ldproxy_haploreg_link(data, type, row);
                },
                "targets": 10
            },
            { className: "dt-body-center", "targets": [ 1, 9, 10 ] }
        ]
    });

}

function createTraitDetailsTable() {

    var ldtraitDetailsTable = $('#new-ldtrait').DataTable( {
        "aaSorting": [],  /* Disable initial sort */
        "bPaginate": true,
        // "sScrollY": "600px",
        "bJQueryUI": false,  // ThemeRoller
        "bLengthChange": true,
        "bFilter": true,
        "bSort": true,
        "bInfo": true,
        "bAutoWidth": true,
        "bProcessing": false,
        "deferRender": false,
        "columnDefs": [
            { 
                className: "dt-head-left", 
                className: "dt-body-left",
                "targets": [ 0, 1, 2, 3, 4 ] 
            }
        ]
    });

}

function createTraitWarningsTable() {

    var ldtraitWarningsTable = $('#new-ldtrait-warnings').DataTable( {
        "aaSorting": [],  /* Disable initial sort */
        "bPaginate": true,
        // "sScrollY": "600px",
        "bJQueryUI": false,  // ThemeRoller
        "bLengthChange": true,
        "bFilter": true,
        "bSort": true,
        "bInfo": true,
        "bAutoWidth": true,
        "bProcessing": false,
        "deferRender": false,
        "columnDefs": [
            { 
                className: "dt-head-left", 
                className: "dt-body-left",
                "targets": [ 0, 1, 2, 3] 
            }
        ]
    });

}

function setupTabs() {
    //Clear the active tab on a reload
    $.each(modules, function(key, id) {
        $("#"+id+"-tab-anchor").removeClass('active');
    });
    $("#home-tab-anchor").removeClass('active');
    $("#help-tab-anchor").removeClass('active');
    $("#apiaccess-tab-anchor").removeClass('active');
    //Look for a tab variable on the url
    var url = "{tab:''}";
    var search = location.search.substring(1);
    if(search.length >0 ) {
        url = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"').replace(/\n/, '\\\\n').replace(/\t/, '') + '"}');
    }

    var currentTab;
    if(typeof url.tab !="undefined") {
        currentTab = url.tab.toLowerCase();
    } else {
        currentTab = 'home';
    }
    if(currentTab.search('assoc')>=0) currentTab = 'ldassoc';
    if(currentTab.search('hap')>=0) currentTab = 'ldhap';
    if(currentTab.search('matrix')>=0) currentTab = 'ldmatrix';
    if(currentTab.search('pair')>=0) currentTab = 'ldpair';
    if(currentTab.search('pop')>=0) currentTab = 'ldpop';
    if(currentTab.search('proxy')>=0) currentTab = 'ldproxy';
    if(currentTab.search('trait')>=0) currentTab = 'ldtrait';
    if(currentTab.search('clip')>=0) currentTab = 'snpclip';
    if(currentTab.search('chip')>=0) currentTab = 'snpchip';
    if(currentTab.search('access')>=0) currentTab = 'apiaccess';

    $('#'+currentTab+'-tab').addClass("in").addClass('active');
    $('#'+currentTab+'-tab-anchor').parent().addClass('active');

    if(typeof url.inputs !="undefined") {
        //console.dir(url.inputs.replace(/\t/, '').replace(/\n/, '\\\\n'));
        updateData(currentTab, url.inputs.replace(/\t/, '').replace(/\n/, '\\\\n'));
    }

}

function refreshPopulation(pop, id) {

    $.each(pop, function(key, value){
        $('option[value="'+value+'"]', $('#'+id+'-population-codes')).prop('selected', true);
    });
    $('#'+id+'-population-codes').multiselect('refresh');

}

function autoCalculate() {
    // if valid parameters exist in the url then calcluate
    var url = {};
    var search = location.search.substring(1);
    if(search.length >0 ) {
        url = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"').replace(/\n/, '\\\\n').replace(/\t/, '') + '"}');
    }
    if(typeof url.tab !="undefined") {
    } else {
        return;
    }
    var id = url.tab.toLowerCase();
    switch (id) {
        case "ldpair":
            if(url.var1 && url.var2 && url.pop) {
                $("#ldpair-snp1").prop('value', url.var1);
                $("#ldpair-snp2").prop('value', url.var2);
                refreshPopulation(decodeURIComponent(url.pop).split("+"), id);
                initCalculate(id);
                updateData(id);
            }
            break;
        case "ldpop":
            if(url.var1 && url.var2 && url.pop && url.r2_d) {
                $("#ldpop-snp1").prop('value', url.var1);
                $("#ldpop-snp2").prop('value', url.var2);
                $("#pop_ld_r2").toggleClass('active', url.r2_d == "r2");
                $("#pop_ld_r2").next().toggleClass('active', url.r2_d == "d");
                refreshPopulation(decodeURIComponent(url.pop).split("+"), id);
                initCalculate(id);
                updateData(id);
            }
            break;
        case "ldproxy":
            if(url.var && url.pop && url.r2_d) {
                $("#ldproxy-snp").prop('value', url.var);
                $("#proxy_color_r2").toggleClass('active', url.r2_d == "r2");
                $("#proxy_color_r2").next().toggleClass('active', url.r2_d == "d");
                refreshPopulation(decodeURIComponent(url.pop).split("+"), id);
                initCalculate(id);
                updateData(id);
            }
            break;
    }
}

function setupSNPchipControls() {
    // Setup click listners for the platform selector
    $('#accordion').on('hidden.bs.collapse', toggleChevron);
    $('#accordion').on('shown.bs.collapse', toggleChevron);

    $('#selectAllChipTypes').click(function(e) {
        if($(".illumina:checked").length == $("input.illumina").length &&
            $(".affymetrix:checked").length == $("input.affymetrix").length) {
            $(".illumina").prop("checked", false);
            $(".affymetrix").prop("checked", false);
            $("#selectAllIllumina").prop("checked", false);
            $("#selectAllAffymetrix").prop("checked", false);
        } else {
            $(".illumina").prop("checked", true);
            $(".affymetrix").prop("checked", true);
            $("#selectAllIllumina").prop("checked", true);
            $("#selectAllAffymetrix").prop("checked", true);
        }
        checkSelectAllCheckbox();
        calculateChipTotals();
    });

    $('#selectAllIllumina').click(function(e) {
        var id = e.target.id;
        //console.log("Look for state");
        //console.dir(e);
        //console.log($("#"+id).prop('checked'));
        if($("#"+id).prop('checked') == true) {
            $(".illumina").prop("checked", true);
        } else {
            $(".illumina").prop("checked", false);
        }
        checkSelectAllCheckbox();
        calculateChipTotals();
    });
    $('#selectAllAffymetrix').click(function(e) {
        var id = e.target.id;
        if($("#"+id).prop('checked') == true) {
            $(".affymetrix").prop("checked", true);
        } else {
            $(".affymetrix").prop("checked", false);
        }
        checkSelectAllCheckbox();
        calculateChipTotals();
    });
    $('#collapseThree').on('click', "input.illumina, input.affymetrix", function(e) {
        checkSelectAllCheckbox();
        calculateChipTotals();
    });
    initChip();
}

function checkSelectAllCheckbox() {
    //Determin if the master checkbox should be checked or not.
    var illumina = $(".illumina:checked").length;
    var affymetrix = $(".affymetrix:checked").length;
    var total_illumina = $("input.illumina").length;
    var total_affymetrix = $("input.affymetrix").length;

    if(illumina == total_illumina) {
        $('#selectAllIllumina').prop('checked', true);
    } else {
        $('#selectAllIllumina').prop('checked', false);
    }
    if(affymetrix == total_affymetrix) {
        $('#selectAllAffymetrix').prop('checked', true);
    } else {
        $('#selectAllAffymetrix').prop('checked', false);
    }

    if(illumina == total_illumina && affymetrix == total_affymetrix) {
        $('#selectAllChipTypes').text("unselect all");
    } else {
        $('#selectAllChipTypes').text("select all");
    }

}

function setupLDtraitControls() {
    $('#ldtrait-snp-list').on('click', "a", function(e) {
        //console.log("clicking on link");
        var rs_number = e.target.id;
        $('#ldtrait-snp-list').show();
        $('#ldtrait-initial-message').hide();
        loadLDtraitDetails(ldTraitRaw, rs_number);
        $('#new-ldtrait-warnings_wrapper').hide();
        $('#ldtrait-initial-message').hide();
    });
    $('#ldtrait-warnings-button').click( function() {
        $('#new-ldtrait_wrapper').hide();
        loadLDtraitWarnings(ldTraitRaw);
        $('#ldtrait-initial-message').hide();
    });
}

function calculateChipTotals() {

    var illumina = $(".illumina:checked").length;
    var affymetrix = $(".affymetrix:checked").length;

    $('#illumina-count').text(illumina);
    $('#affymetrix-count').text(affymetrix);
    if(illumina == 0 && affymetrix == 0) {
        $("#snpchip").prop('disabled', true);
    } else {
        $("#snpchip").prop('disabled', false);
    }

}

function setupSNPclipControls() {
    //('#snpclip').attr('disabled', false); // Remove this. (only need for testing)
    $('#snpclip-snp-list').on('click', "a", function(e) {
        //console.log("clicking on link");
        var rs_number = e.target.id;
        $('#snpclip-snp-list').show();
        $('#snpclip-initial-message').hide();
        loadSNPdetails(ldClipRaw, rs_number);
        $('#snpclip-details').show();
        $('#snpclip-warnings').hide();
        $('#snpclip-initial-message').hide();
    });
    $('#snpclip-warnings-button').click( function() {
        $('#snpclip-details').hide();
        $('#snpclip-initial-message').hide();
        $('#snpclip-warnings').show();
    });
}

/*
function pushInputs(currentTab, inputs) {
    window.history.pushState({},'', "?tab="+currentTab+"&inputs="+JSON.stringify(inputs));
}
*/

function showFFWarning() {
    // Is this a version of Mozilla?
    if ($.browser.mozilla) {
        var userAgent = navigator.userAgent.toLowerCase();
        // Is it Firefox?
        if (userAgent.indexOf('firefox') != -1) {
            userAgent = userAgent.substring(userAgent.indexOf('firefox/') + 8);
            var version = userAgent.substring(0, userAgent.indexOf('.'));
            if (version < 36) {
                $('.ffWarning').show();
            }
        }
    }
}

// Map knockout models to a sample json data
//var ldproxyModel = ko.mapping.fromJS(ldProxyData);
var ldpairModel = ko.mapping.fromJS(ldPairData);
var ldhapModel = ko.mapping.fromJS(ldhapData);
// var ldtraitModel = ko.mapping.fromJS(ldtraitData);
var snpclipModel = ko.mapping.fromJS(snpclipData);
var snpchipModel = ko.mapping.fromJS(snpchipData);

function RefreshTable(tableId, json) {
    table = $(tableId).dataTable();
    oSettings = table.fnSettings();
    table.fnClearTable(this);
    for (var i = 0; i < json.aaData.length; i++) {
      table.oApi._fnAddData(oSettings, json.aaData[i]);
    }
    oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
    table.fnDraw();
}

function ldproxy_rs_results_link(data, type, row) {

    //if no rs number is available return without a link.
    if(data.length == 1) {
        return "";
    }
    var server = 'http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi';
    var rs_number = data.substring(2);
    var params = {
        rs : rs_number
    };
    var href = server + "?" + $.param(params);
    var target = 'rs_number_' + Math.floor(Math.random() * (99999 - 10000 + 1));
//  var href = 'http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs=128';
    var link;
    link = '<a href="'+href+'" target="'+target+'">'+data+'</a>';
    //return data +' ('+ row[3]+')';
    return link;
}

function ldpop_ldpair_results_link(data, type, row) {
    // parse data
    // console.log(data);
    var snp1 = data[0];
    var snp2 = data[1];
    var pops = data[2];
    var server = window.location.origin + '/?tab=ldpair';
    var params = {
        var1: snp1,
        var2: snp2,
        pop: pops
    };
    var href = server + '&' + $.param(params);
    var link = '<a style="color: #318fe2" href="' + href + '" + target="_blank">link</a>';
    return link;
}

function ldproxy_position_link(data, type, row) {

    // Find the coord of the rs number
    //
    // Cluster Report:
    //
    var server = 'http://genome.ucsc.edu/cgi-bin/hgTracks';
    // http://genome.ucsc.edu/cgi-bin/hgTracks?
    // position=chr4:103554686-104554686
    // &snp141=pack
    // &hgFind.matches=rs2720460
    // snp1-coord

    //
    // Genome Browser:
    //

    //var positions = data.query_snp.Coord.split(":");
    //Example:
    //http://genome.ucsc.edu/cgi-bin/hgTracks?position=chr7%3A24958727-24959227&snp141=pack&hgFind.matches=rs128
    var chr = row[1];
    var mid_value = parseInt(data);
    var offset = 250;
    var range = (mid_value - offset) + "-" + (mid_value + offset);
    var position = chr + ":" + range;
    var rs_number = row[0];
    var params = {
        db:'hg19',
        position : position,
        snp151 : 'pack',
        'hgFind.matches' : rs_number
    };
    var href = server + "?" + $.param(params);
    var target = 'position_' + Math.floor(Math.random() * (99999 - 10000 + 1));
    var link = '<a href="'+href+'" target="'+target+'">'+data+'</a>';

    return link;
}

function ldproxy_regulome_link(data, type, row) {

    // Create RegulomeDB links

    var server = 'http://www.regulomedb.org/snp';
    var chr = row[1];
    var mid_value = parseInt(row[2]);
    var zero_base = mid_value - 1;
    var href = server + "/" + chr + "/" + zero_base;
    var target = 'regulome_' + Math.floor(Math.random() * (99999 - 10000 + 1));
    var link = '<a href="'+href+'" target="'+target+'">'+data+'</a>';

    return link;

}

function ldproxy_haploreg_link(data, type, row) {

    // Create RegulomeDB links

    var server = 'http://pubs.broadinstitute.org/mammals/haploreg/detail_v4.1.php';

    var rs_number = row[0];
    var params = {
        query : "",
        id : rs_number
    };
    var href = server + "?" + $.param(params);
    var target = 'haploreg_' + Math.floor(Math.random() * (99999 - 10000 + 1));
    var img = '<img src="LDproxy_external_link.png" alt="HaploReg Details" title="HaploReg Details" class="haploreg_external_link" style="width:16px;height:16px;">';
    var link = '<a href="'+href+'" target="'+target+'">'+img+'</a>';

    return link;

}

function updateVersion(version) {
    $("#ldlink_version").text(version);
}

function cleanSNP(text) {
    //
    //Clean up file remove spaces.
    //  Only allow first column
    //
    var lines = text.split('\n');
    var list = "";
    var variant = "";

    $.each(lines, function (key, value) {
        var clean = value.replace(/\t/, " ");
        var line = clean.replace(/[^[A-Z0-9\n \:]/ig, "");
        line = line.split(' ');
        variant = "";
        $.each(line, function(key,value){
            if(value != "") {
                variant = value;
                return false;
            }
        });

        if(variant.length > 2) {
            // var pos = variant.search(/^[R|r][S|s]\d+$/);
            // add genomic positions too (ex. chr1:123456) in the future
            var pos = variant.search(/^(([ |\t])*[r|R][s|S]\d+([ |\t])*|([ |\t])*[c|C][h|H][r|R][\d|x|X|y|Y]\d?:\d+([ |\t])*)$/);
            if(pos == 0) {
                list += variant + '\n';
            }
        }
    });
    return list;
}

function populateTextArea(event, numFiles, label) {
    id = event.target.id;
    if (window.FileReader) {

        var input = event.target;
        var reader = new FileReader();
        reader.onload = function() {
            var text = reader.result;
            $('#'+id+'-snp-numbers').val(cleanSNP(text));
            $('#'+id+'-snp-numbers').keyup();
        };
        reader.readAsText(input.files[0]);
    } else {
        alert('FileReader not supported');
        return;
    }
}

function populateAssocDropDown(headers) {
    $.each(dropdowns, function(i, id) {
        $("#"+id).find("ul").empty();
        $.each(headers, function(key, value){
            $("#"+id).find("ul").append('<li role="presentation"><a role="menuitem" tabindex="-1" href="#">'+value+'</a></li>');
        });
        var previous_value = readCookie(id);
        //console.log("You previous selected: "+previous_value);
        if($.inArray(previous_value, headers) != -1) {
            setBootstrapSelector(id, previous_value);
        } else {
            resetBootstrapSelector(id);
        }
    });
}

function parseHeaderValues(header_line) {
    //alert(header_line);
    //Assumption: No spaces in the header title for each column.  Either a space or comma between header titles.
    var clean = header_line.replace(/\t/g, " ");
    clean = clean.replace(/","/g, " ");
    clean = clean.replace(/,/g, " ");
    //var line = clean.replace(/[^[A-Z0-9\n ]/ig, "");
    //console.log("Here is clean");
    //console.log(clean);
    var headers = clean.split(" ");
    //console.log(headers);
    var new_headers = headers.filter(function(v){return v!==''});
    //console.log(new_headers);

    populateAssocDropDown(new_headers);

}

function getHeaderLine(header) {
    //console.log(header);
    var index = 0;
    //var view = new Uint8Array(header);
    var view = header;
    for(index=0;index<=header.length;index++) {
        if (header.charCodeAt(index) === 10 || header.charCodeAt(index) === 13) {
            //console.log("Found a return");
            parseHeaderValues(header.substr(0, index));
            return;
        }
    }

    //console.warn("Did not find a return in the header line. Please fix input file.  Make sure the header line is the first line and has a return.");

}

function populateHeaderValues(event, numFiles, label) {

    console.warn("populateHeaderValues");
    //findColumnLength(event.target.files[0], printLength);
    parseFile(event.target.files[0], getHeaderLine);
    /*
    id = event.target.id;
    if (window.FileReader) {

        var input = event.target;
        var reader = new FileReader();
        reader.onload = function() {
            var text = reader.result;
            $('#'+id+'-snp-numbers').val(cleanSNP(text));
            $('#'+id+'-snp-numbers').keyup();
        };
        reader.readAsText(input.files[0]);
    } else {
        alert('FileReader not supported');
        return;
    }
    */
}

function loadHelp() {
    $('#help-tab').load('help.html');
}

function calculate(e) {
    var formId = e.target.id;
    e.preventDefault();

    // strip out "Form" from id
    var id = formId.slice(0, formId.length - 4);

    initCalculate(id);
    updateData(id);

}

function initCalculate(id) {
    $('#'+id+'-results-container').hide();
    $('#'+id+'-message').hide();
    $('#'+id+'-message-warning').hide();
}

function updateData(id) {

    switch (id) {
        case 'ldassoc':
            if(isBrowseSet(id) && isRegionSet(id) && areRegionDetailsSet(id) && isPopulationSet(id)) {
                $('#'+id+"-loading").show();
                updateLDassoc();
            }
            break;
        case 'ldhap':
            if(isPopulationSet(id)) {
                $('#'+id+"-loading").show();
                updateLDhap();
            }
            break;
        case 'ldmatrix':
            if(isPopulationSet(id) && checkSNPListLength(id)) {
                $('#'+id+"-loading").show();
                updateLDmatrix();
            }
            break;
        case 'ldpair':
            if(isPopulationSet(id)) {
                $('#'+id+"-loading").show();
                updateLDpair();
            }
            break;
        case 'ldpop':
            if(isPopulationSet(id)) {
                $('#'+id+"-loading").show();
                updateLDpop();
            }
            break;
        case 'ldproxy':
            if(isPopulationSet(id)) {
                $('#'+id+"-loading").show();
                updateLDproxy();
            }
            break;
        case 'ldtrait':
            if(isPopulationSet(id)) {
                $('#'+id+"-loading").show();
                updateLDtrait();
            }
            break;
        case 'snpclip':
            if(isPopulationSet(id)) {
                $('#'+id+"-loading").show();
                updateSNPclip();
            }
            break;
        case 'snpchip':
            $('#'+id+"-loading").show();
            updateSNPchip();
            break;
        case 'apiaccess':
            $('#'+id+"-loading").show();
            updateAPIaccess();
            break;
        case 'apiblocked':
            if(checkTextAreaLength(id)) {
                $('#'+id+"-loading").show();
                updateAPIblocked();
                break;
            }
    }
}

function isBrowseSet(elementId) {
    var query = $('#header-values');
    var isVisible = query.is(':visible');
    if(isVisible === true) {
        $('#'+elementId+'-browse-set-none').popover('hide');
        return true;
    } else {
        $('#'+elementId+'-browse-set-none').popover('show');
        setTimeout(function() { $('#'+elementId+'-browse-set-none').popover('hide'); }, 4000);
        return false;
    }
}

function isRegionSet(elementId) {
    var region =  $('#region-codes-menu1').html().replace(/&nbsp;<span class="caret"><\/span>/, "");
    if(region == "Gene" || region == "Region" || region == "Variant") {
        $('#'+elementId+'-region-codes-zero').popover('hide');
        return true;
    } else {
        $('#'+elementId+'-region-codes-zero').popover('show');
        setTimeout(function() { $('#'+elementId+'-region-codes-zero').popover('hide'); }, 4000);
        return false;
    }
}

function isGeneNameSet(elementId) {
  if ($('#region-gene-name').val().toString().length > 0) {
    $('#'+elementId+'-region-gene-name').popover('hide');
    return true;
  }
  else {
    $('#'+elementId+'-region-gene-name').popover('show');
    setTimeout(function() { $('#'+elementId+'-region-gene-name').popover('hide'); }, 4000);
    return false;
  }
}

function isGeneBPSet(elementId) {
  if ($('#region-gene-base-pair-window').val().toString().length > 0) {
    $('#'+elementId+'-region-gene-bp').popover('hide');
    return true;
  }
  else {
    $('#'+elementId+'-region-gene-bp').popover('show');
    setTimeout(function() { $('#'+elementId+'-region-gene-bp').popover('hide'); }, 4000);
    return false;
  }
}

function isRegionStartSet(elementId) {
  if ($('#region-region-start-coord').val().toString().length > 0) {
    $('#'+elementId+'-region-region-start').popover('hide');
    return true;
  }
  else {
    $('#'+elementId+'-region-region-start').popover('show');
    setTimeout(function() { $('#'+elementId+'-region-region-start').popover('hide'); }, 4000);
    return false;
  }
}

function isRegionEndSet(elementId) {
  if ($('#region-region-end-coord').val().toString().length > 0) {
    $('#'+elementId+'-region-region-end').popover('hide');
    return true;
  }
  else {
    $('#'+elementId+'-region-region-end').popover('show');
    setTimeout(function() { $('#'+elementId+'-region-region-end').popover('hide'); }, 4000);
    return false;
  }
}

function isVariantIndexSet(elementId) {
  if ($('#region-variant-index').val().toString().length > 0) {
    $('#'+elementId+'-variant-index-pop').popover('hide');
    return true;
  }
  else {
    $('#'+elementId+'-variant-index-pop').popover('show');
    setTimeout(function() { $('#'+elementId+'-variant-index-pop').popover('hide'); }, 4000);
    return false;
  }
}

function isVariantBPSet(elementId) {
  if ($('#region-variant-base-pair-window').val().toString().length > 0) {
    $('#'+elementId+'-variant-bp-pop').popover('hide');
    return true;
  }
  else {
    $('#'+elementId+'-variant-bp-pop').popover('show');
    setTimeout(function() { $('#'+elementId+'-variant-bp-pop').popover('hide'); }, 4000);
    return false;
  }
}

function areRegionDetailsSet(elementId) {
    var region =  $('#region-codes-menu1').html().replace(/&nbsp;<span class="caret"><\/span>/, "");
    if (region == "Gene") {
      // gene name
      // bp window
      if (isGeneNameSet(elementId) && isGeneBPSet(elementId)) {
        return true;
      }
      else {
        return false;
      }
    }
    if (region == "Region") {
      // region start
      // region end
      if (isRegionStartSet(elementId) && isRegionEndSet(elementId)) {
        return true;
      }
      else {
        return false;
      }
    }
    if (region == "Variant") {
      // index variant
      // bp window
      if (isVariantIndexSet(elementId) && isVariantBPSet(elementId)) {
        return true;
      }
      else {
        return false;
      }
    }
}

function isPopulationSet(elementId) {
    var population =  $('#'+elementId+'-population-codes').val();
    if(population == null ) {
        $('#'+elementId+'-population-codes-zero').popover('show');
        setTimeout(function() { $('#'+elementId+'-population-codes-zero').popover('hide'); }, 4000);
        return false;
    } else {
        $('#'+elementId+'-population-codes-zero').popover('hide');
        return true;
    }
}

function checkSNPListLength(elementId) {
    var snps =  $('#'+elementId+'-file-snp-numbers').val();
    var snplist = snps.split("\n");
    // console.log(snplist);
    snplist = snplist.filter(Boolean);
    // console.log(snplist.length);
    if(snplist.length > 300) {
        $('#'+elementId+'-file-snp-warning').popover('show');
        setTimeout(function() { $('#'+elementId+'-file-snp-warning').popover('hide'); }, 4000);
        return false;
    } else {
        $('#'+elementId+'-file-snp-warning').popover('hide');
        return true;
    }
}

function checkTextAreaLength(elementId) {
    var description =  $('#'+elementId+'-justification').val();
    var count = description.length;
    if(count > 500 ) {
        $('#'+elementId+'-justification-warning').popover('show');
        var message = "Please keep response under 500 characters. Current: " + count.toString() + " characters."
        $('#'+elementId+'-justification-warning').attr('data-content', message);
        setTimeout(function() { $('#'+elementId+'-justification-warning').popover('hide'); }, 4000);
        return false;
    } else {
        $('#'+elementId+'-justification-warning').popover('hide');
        return true;
    }
    // minimum character count
    // else if(count < 50) {
    //     $('#'+elementId+'-justification-warning').popover('show');
    //     var message = "Please respond with at least 50 characters. Current: " + count.toString() + " characters."
    //     $('#'+elementId+'-justification-warning').attr('data-content', message);
    //     setTimeout(function() { $('#'+elementId+'-justification-warning').popover('hide'); }, 4000);
    //     return false;
    // } 
}
    

function updateLDassoc() {

    var id = "ldassoc";

    var $btn = $('#' + id).button('loading');
    var population = getPopulationCodes(id+'-population-codes');
    var ldInputs = {
        pop : population.join("+"),
        filename : $("#ldassoc-file-label").val(),
        reference : Math.floor(Math.random() * (99999 - 10000 + 1)),
        columns : new Object,
        calculateRegion: $("#assoc-region > button").val(),
        gene: new Object(),
        region: new Object(),
        variant: new Object(),
        dprime: $("#assoc-matrix-color-r2").hasClass('active') ? "False" :"True",
        transcript: $("#assoc-transcript").hasClass('active') ? "False" :"True",
        annotate: $("#assoc-annotate").hasClass('active') ? "True" :"False",
        useEx: $('#example-gwas').is(':checked')? "True" :"False"
    };


    ldInputs.columns.chromosome = $("#assoc-chromosome > button").val();
    ldInputs.columns.position = $("#assoc-position > button").val();
    ldInputs.columns.pvalue = $("#assoc-p-value > button").val();
    //gene
    ldInputs.gene.name = $("#region-gene-name").val();
    ldInputs.gene.basepair = $("#region-gene-base-pair-window").val();
    ldInputs.gene.index = $("#region-gene-index").val();
    //region
    ldInputs.region.start = $("#region-region-start-coord").val();
    ldInputs.region.end = $("#region-region-end-coord").val();
    ldInputs.region.index = $("#region-region-index").val();
    //variant
    ldInputs.variant.index = $("#region-variant-index").val();
    ldInputs.variant.basepair = $("#region-variant-base-pair-window").val();

    $('#ldassoc-genome').attr('href',
        'http://genome.ucsc.edu/cgi-bin/hgTracks?db=hg19&hgt.customText=http://'+location.hostname+'/tmp/track'
        + ldInputs.reference + '.txt');

    //console.dir(ldproxyInputs);
    $('#ldassoc-results-link').attr('href','tmp/assoc' + ldInputs.reference + '.txt');


    var url = restServerUrl + "/ldassoc";
    var ajaxRequest = $.ajax({
        type : 'GET',
        url : url,
        data : ldInputs,
        contentType : 'application/json' // JSON
    });

    ajaxRequest.success(function(data) {
        //data is returned as a string representation of JSON instead of JSON obj
        //JSON.parse() cleans up this json string.

        // create bokeh object with output_backend=canvas from svg
        var dataString = data[0];
        var dataCanvas = new Object([dataString, data[1]]);

        var jsonObjCanvas;
        if(typeof dataCanvas == 'string') {
            jsonObjCanvas = JSON.parse(dataCanvas);
        } else {
            jsonObjCanvas = dataCanvas;
        }

        // display graph if no errors
        if (displayError(id, jsonObjCanvas) == false) {
            $('#ldassoc-bokeh-graph').empty().append(dataCanvas);
 
            // place Download PDF button
	        $('#' + id + '-export-dropdown').empty().prepend('<div class="dropdown pull-right"><button class="btn btn-default dropdown-toggle" type="button" id="ldassoc-menu1" data-toggle="dropdown" disabled>Exporting Plot <i class="fa fa-spinner fa-pulse"></i><span class="sr-only">Loading</span></button><ul class="dropdown-menu " role="menu" aria-labelledby="menu1" style="overflow: hidden;"><li role="presentation"><a role="menuitem" id="ldassoc-downloadSVG" class="text-center" tabindex="-1" href="#">SVG</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" id="ldassoc-downloadPDF" class="text-center" tabindex="-1" href="#">PDF</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" id="ldassoc-downloadPNG" class="text-center" tabindex="-1" href="#">PNG</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" id="ldassoc-downloadJPEG" class="text-center" tabindex="-1" href="#">JPEG</a></li></ul></div>');
            $("#ldassoc-downloadSVG").click(function(e) {
                e.preventDefault();
                var assoc_plot = "tmp/assoc_plot_" + ldInputs.reference + ".svg";
                window.open( assoc_plot, "_blank" )
            });
            $("#ldassoc-downloadPDF").click(function(e) {
                e.preventDefault();
                var assoc_plot = "tmp/assoc_plot_" + ldInputs.reference + ".pdf";
                window.open( assoc_plot, "_blank" )
            });
            $("#ldassoc-downloadPNG").click(function(e) {
                e.preventDefault();
                var assoc_plot = "tmp/assoc_plot_" + ldInputs.reference + ".png";
                window.open( assoc_plot, "_blank" )
            });
            $("#ldassoc-downloadJPEG").click(function(e) {
                e.preventDefault();
                var assoc_plot = "tmp/assoc_plot_" + ldInputs.reference + ".jpeg";
                window.open( assoc_plot, "_blank" )
            });

            // enable button once .svg file is generated from subprocess
            var fileURL = "/tmp/assoc_plot_" + ldInputs.reference + ".jpeg";
            checkFile(id, fileURL, 180);

            $('#' + id + '-results-container').show();
            getLDAssocResults('assoc'+ldInputs.reference+".json");
        } else {
            displayError(id, dataCanvas);
        }
        $("#"+id+"-loading").hide();

    });
    ajaxRequest.fail(function(jqXHR, textStatus) {
        displayCommFail(id, jqXHR, textStatus);
    });
    ajaxRequest.always(function() {
        $btn.button('reset');
        setTimeout(function() {
            var checkbox = $(".bk-toolbar-inspector").children().first();
            $(checkbox).attr('id', 'hover');
            $(checkbox).append('<label for="hover" class="sr-only">Hover Tool</label>');
        }, 100);
    });

    hideLoadingIcon(ajaxRequest, id);

}

function updateLDhap() {

    var id = "ldhap";

    var $btn = $('#' + id).button('loading');
    var snps = DOMPurify.sanitize($('#' + id + '-file-snp-numbers').val());
    var population = getPopulationCodes(id+'-population-codes');
    var ldInputs = {
        snps : snps,
        pop : population.join("+"),
        reference : Math.floor(Math.random() * (99999 - 10000 + 1))
    };
    var url = restServerUrl + "/ldhap";
    var ajaxRequest = $.ajax({
        type : 'GET',
        url : url,
        data : ldInputs,
        contentType : 'application/json' // JSON
    });

    ajaxRequest.success(function(data) {
        //data is returned as a string representation of JSON instead of JSON obj
        //JSON.parse() cleans up this json string.
        var jsonObj;
        if(typeof data == 'string') {
            jsonObj = JSON.parse(data);
        } else {
            jsonObj = data;
        }

        if (displayError(id, jsonObj) == false) {
            $('#' + id + '-results-container').show();
            $('#' + id + '-links-container').show();
            var ldhapTable = formatLDhapData($.parseJSON(data));
            $('#ldhap-haplotypes-column').attr('colspan',ldhapTable.footer.length);
            ko.mapping.fromJS(ldhapTable, ldhapModel);
            addLDHapHyperLinks(ldInputs.reference, ldhapTable);
        }
    });
    ajaxRequest.fail(function(jqXHR, textStatus) {
        displayCommFail(id, jqXHR, textStatus);
    });
    ajaxRequest.always(function() {
        $btn.button('reset');
    });

    hideLoadingIcon(ajaxRequest, id);
}

function explodeLegalArray(entities) {
    //Turn an arry into a legal statement to use in a scentense
    //Example: array("Maryland", "New York", "Virginia")
    // = "Maryland, New York, and Virgina"

    var delimiter = ",";
    var output;
    if(entities.length == 0) {
        return entities[0];
    }

    $.each(entities, function (key, value) {
        if(key == 0) {
            output = value;
        } else if(key == entities.length-1) {
            output += " & "+value;
        } else {
            output += delimiter+" "+value;
        }
    });
    return output;
}

function updateLDtrait() {
    var id = "ldtrait";

    var $btn = $('#' + id).button('loading');
    var snps = DOMPurify.sanitize($('#' + id + '-file-snp-numbers').val());
    var population = getPopulationCodes(id+'-population-codes');
    var r2_d;

    if($('#ldtrait_ld_r2').hasClass('active')) {
        r2_d = 'r2'; // i.e. R2
        $("#ldpop-ld-legend-img").attr('src', 'LDpop_legend_R2.png');
    } else {
        r2_d = 'd';  // i.e. Dprime
        $("#ldpop-ld-legend-img").attr('src', 'LDpop_legend_Dprime.png');
    }

    var ldInputs = {
        snps : snps,
        pop : population.join("+"),
        r2_d: r2_d,
        r2_d_threshold: $("#"+id+"_r2_d_threshold").val(),
        reference : Math.floor(Math.random() * (99999 - 10000 + 1))
    };

    //Show inital message
    // $('#ldtrait-details').hide();
    $('#new-ldtrait_wrapper').hide();
    $('#new-ldtrait-warnings_wrapper').hide();
    $('#ldtrait-initial-message').show();

    //Update href on
    //Set file links
    $("#ldtrait-variants-annotated-link").attr('href', 'tmp/trait_variants_annotated' + ldInputs.reference + '.txt');
    $("#ldtrait-variants-annotated-link").attr('target', 'trait_variants_annotated' + ldInputs.reference);
    // $("#ldtrait-details-link").attr('href', 'tmp/details'+ldInputs.reference+'.txt');
    // $("#ldtrait-details-link").attr('target', 'snp_details_'+ldInputs.reference);

    // Set populations on LDThinned
    //$('.ldtrait-populations').empty().append(explodeLegalArray(population));

    var url = restServerUrl + "/ldtrait";
    var ajaxRequest = $.ajax({
        type : 'POST',
        url : url,
        data : JSON.stringify(ldInputs),
        contentType : 'application/json' // JSON
    });
    ajaxRequest.success(function(data) {
        //data is returned as a string representation of JSON instead of JSON obj
        var jsonObj=data;
        console.log(data);
        if (displayError(id, jsonObj) == false) {
            $('#' + id + '-results-container').show();
            $('#' + id + '-links-container').show();
            $('#'+id+"-loading").hide();
            initTrait(data);
        }
    });
    ajaxRequest.fail(function(jqXHR, textStatus) {
        displayCommFail(id, jqXHR, textStatus);
    });
    ajaxRequest.always(function() {
        $btn.button('reset');
    });

    hideLoadingIcon(ajaxRequest, id);
}

function updateSNPclip() {
    var id = "snpclip";

    var $btn = $('#' + id).button('loading');
    var snps = DOMPurify.sanitize($('#' + id + '-file-snp-numbers').val());
    var population = getPopulationCodes(id+'-population-codes');

    var ldInputs = {
        snps : snps,
        pop : population.join("+"),
        r2_threshold: $("#"+id+"_r2_threshold").val(),
        maf_threshold: $("#"+id+"_maf_threshold").val(),
        reference : Math.floor(Math.random() * (99999 - 10000 + 1))
    };

    //Show inital message
    $('#snpclip-details').hide();
    $('#snpclip-warnings').hide();
    $('#snpclip-initial-message').show();

    //Update href on
    //Set file links
    $("#snpclip-snps-link").attr('href', 'tmp/snp_list'+ldInputs.reference+'.txt');
    $("#snpclip-snps-link").attr('target', 'snp_thin_list_'+ldInputs.reference);
    $("#snpclip-details-link").attr('href', 'tmp/details'+ldInputs.reference+'.txt');
    $("#snpclip-details-link").attr('target', 'snp_details_'+ldInputs.reference);

    // Set populations on LDThinned
    //$('.snpclip-populations').empty().append(explodeLegalArray(population));

    var url = restServerUrl + "/snpclip";
    var ajaxRequest = $.ajax({
        type : 'POST',
        url : url,
        data : JSON.stringify(ldInputs),
        contentType : 'application/json' // JSON
    });
    ajaxRequest.success(function(data) {
        //data is returned as a string representation of JSON instead of JSON obj
        var jsonObj=data;
        if (displayError(id, jsonObj) == false) {
            $('#' + id + '-results-container').show();
            $('#' + id + '-links-container').show();
            $('#'+id+"-loading").hide();
            initClip(data);
        }
    });
    ajaxRequest.fail(function(jqXHR, textStatus) {
        displayCommFail(id, jqXHR, textStatus);
    });
    ajaxRequest.always(function() {
        $btn.button('reset');
    });

    hideLoadingIcon(ajaxRequest, id);
}

function updateSNPchip() {
    var id = "snpchip";

    var $btn = $('#' + id).button('loading');
    $("#collapseThree").removeClass("in");
    var snps = DOMPurify.sanitize($('#' + id + '-file-snp-numbers').val());
    var platforms = [];

    $('.affymetrix:checked').each(function() {
        platforms.push($(this).val());
    });
    $('.illumina:checked').each(function() {
        platforms.push($(this).val());
    });


    var ldInputs = {
        snps : snps,
        platforms: platforms.join("+"),
        reference : Math.floor(Math.random() * (99999 - 10000 + 1))
    };
    $('#snp_chip_list').attr('href', "tmp/details"+ldInputs.reference+".txt");
    $('#snp_chip_list').attr('target', "chip_details"+ldInputs.reference+".txt");
    //console.dir(ldInputs);
    var url = restServerUrl + "/snpchip";
    var ajaxRequest = $.ajax({
        type : 'POST',
        url : url,
    data : JSON.stringify(ldInputs),
        contentType : 'application/json' // JSON
    });

    ajaxRequest.success(function(data) {
        //data is returned as a string representation of JSON instead of JSON obj
        var jsonObj=data;
        if (displayError(id, jsonObj) == false) {
            $('#' + id + '-results-container').show();
            $('#' + id + '-links-container').show();
            $('#'+id+"-loading").hide();
            loadSNPChip(data);
        }
    });
    ajaxRequest.fail(function(jqXHR, textStatus) {
        displayCommFail(id, jqXHR, textStatus);
    });
    ajaxRequest.always(function() {
        $btn.button('reset');
    });

    hideLoadingIcon(ajaxRequest, id);
}

function initChip() {
    //Setup the platform
    var id = "snpchip";

    var url = restServerUrl + "/snpchip_platforms";
    var ajaxRequest = $.ajax({
        type : 'GET',
        url : url,
        contentType : 'application/json' // JSON
    });

    ajaxRequest.success(function(data) {
        if (displayError(id, data) == false) {
            //buildPopulationDropdownSNPchip(data);
            buildPlatformSNPchip(data);
        }
    });
    ajaxRequest.fail(function(jqXHR, textStatus) {
        displayCommFail(id, jqXHR, textStatus);
    });

}

function loadSNPChip(data) {
    //Setup data and display
    //snpchipData = [];
    // = "This is about error";

    //delete snpchipData["warning"];
    //delete snpchipData["error"];

    var snpchip = JSON.parse(data);

    var all_platforms_used = [];
    var newchip = [];
    var snpData;
    var obj;
    var test = "";
    var associated_platforms;
    var total_platform_count = 0;

    $.each(snpchip, function(row, detail) {
        if(row.search("warning")>=0 ||row.search("error")>=0) {
            //Print the warning somewhere on the screen.
            if(row.search("warning")>=0) {
                snpchipData["warning"] = detail;
            }
            if(row.search("error")>=0) {
                snpchipData["error"] = detail;
            }
            //Remove this item
            delete snpchip[row];
        } else {
            //Gather all platforms
            //if(parseInt(row)< 1) {
                associated_platforms = detail[2].split(",");
                //console.log("associated_platforms: "+parseInt(row)+" "+detail[0]);
                //console.dir(associated_platforms.sort());

                $.each(detail[2].split(","), function(key, value){
                    if(value != "") {
                        all_platforms_used.push(value);
                        test += key+") "+detail[2]+"\n";
                    }
                });
            //}
        }
    });
    //console.warn("All Platforms");
    //console.log("Count: "+all_platforms_used.length);
    //Find the unique one from all of the platforms
    var used_platforms
    var platform_list = all_platforms_used.unique();
    var map = [];
    var reversed_platform_list = [];
    snpchipData["headers"] = [];
    platform_list.sort();
    /*
    console.warn("Filtered list of  Platforms");
    console.log("Count: "+platform_list.length);
    console.log(test);
    */
    //Now that we have the platform list... Map each platform.
    $.each(snpchip, function(row, detail){
        //Walk throught the platform_list and determine if it has the list... create a map for the table.
        map = [];
        used_platforms = detail[2].split(",");
        //console.log("used_platforms:");
        //console.dir(used_platforms);
        //console.warn("row: "+row);
        var platform_count = 0;

        $.each(platform_list, function(key, value) {
            //console.log(key+":"+value);
            //console.info($.inArray(value, used_platforms));
            if($.inArray(value, used_platforms) >= 0) {
                map.push("&#x2713;");
                platform_count++;
                total_platform_count++;
            } else {
                map.push("&nbsp;");
            }
        });
        //Split detail[1] into two parts
        var chromo_position = detail[1].split(":");
        obj = {
            "rs_number" : anchorRSnumber(detail[0]),
            "chromosome" : chromo_position[0],
            "position" : anchorRSposition("chr"+detail[1], detail[0]),
            "map" : map,
            "rs_number_original" : detail[0],
            "platform_count" : platform_count
        };
        //console.dir(obj);
        newchip.push(obj);
    });

    $.each(platform_list, function(key, value) {
        //reversed_platform_list.push(snpchipReverseLookup[value]);

        obj ={
            code: snpchipReverseLookup[value],
            platform: value
        };
        if(typeof obj.code === "undefined") {
            /*
            console.info("Reverse lookup does appear to exist");
            console.info("Removing key "+key+" from platform_list below.");
            console.info("This value doesn't seem to have a code: "+value);
            console.log("platform_list:");
            console.dir(platform_list);
            */
            obj ={
                code: "unknown code",
                platform: value
            };
            snpchipData["headers"].push(obj);
        } else {
            snpchipData["headers"].push(obj);
        }
    });
    snpchipData["snpchip"] = newchip;
    var header_len = snpchipData["headers"].length;
    if( header_len < 20) {
        //calcualte width
        $('#snpchip-table-right').attr('width', 100+(header_len*30));
    } else {
        $('#snpchip-table-right').removeAttr('width');
    }

    ko.mapping.fromJS(snpchipData, snpchipModel);

    $('#snpchip-message-warning-content').empty();
    checkAlert("snpchip", snpchipData.warning, "warning", true);
    checkAlert("snpchip", snpchipData.error, "error", false);
    //Display warning if an rs has no platform arrays
    if(total_platform_count == 0) {
        //Hide table and display an error.
        $('#snpchip-results-container').hide();

    }
}

function checkAlert(elementId, message, type, displayResults) {
    //type is either 'warning' or 'error'
    var prefix;
    if(type == 'warning') {
        prefix = elementId+'-message-warning';
    } else {
        prefix = elementId+'-message';
    }
    $('#'+prefix).hide();
    if (typeof message !== 'undefined' && message.length > 0) {
        $('#'+prefix+'-content').html("<div>"+message.replace(/(?:\r\n|\r|\n)/g, '<br />')+"</div>");
        $('#'+prefix).show();
        if (typeof displayResults !== 'undefined' && displayResults) {
            $('#'+elementId+'-results-container').show();
        } else {
            $('#'+elementId+'-results-container').hide();
        }
    }
}

function populateSNPlistLDtrait(data) {
    //clear out the list
    $("#ldtrait-snp-list").empty();
    //Add the clipped list
    $.each(data.snp_list, function( index, value ){
        $("#ldtrait-snp-list").append(
            $("<tr>").append(
                $("<td>").append(
                    $("<a>")
                        .attr('id', value)
                        .attr('title', 'View details.')
                        .append(value)
                    )
                )
            )
    });

}

function populateSNPlist(data) {

    //clear out the list
    $("#snpclip-snp-list").empty();
    //Add the clipped list
    $.each(data.snp_list, function( index, value ){
        $("#snpclip-snp-list").append(
            $("<tr>").append(
                $("<td>").append(
                    $("<a>")
                        .attr('id', value)
                        .attr('title', 'View details.')
                        .append(value)
                    )
                )
            )
    });

}

function anchorRSnumber(rs_number) {
    var server = 'http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi';

    var raw_rs_number = rs_number.substring(2);
    var params = {
        rs : raw_rs_number
    };
    var url = server + "?" + $.param(params);

    return '<a href="'+url+'" target="rs_number_'+rs_number+'">'+rs_number+'</a>';
}

function anchorRSposition(coord, rs_number) {
    //
    // Genome Browser:
    //
    //hide_chr = hide_chr || false;

    if(coord.toUpperCase() == "NA")
        return "NA";

    server = 'http://genome.ucsc.edu/cgi-bin/hgTracks';
    // snp1-coord
    var positions = coord.split(":");
    var chr = positions[0];
    var mid_value = parseInt(positions[1]);
    var offset = 250;
    var range = (mid_value - offset) + "-" + (mid_value + offset);
    var position = chr + ":" + range;
    params = {
        db:'hg19',
        position : position,
        snp151 : 'pack',
        'hgFind.matches' : rs_number
    };
    var url = server + "?" + $.param(params);
    //if(hide_chr) {
    //  return '<a href="'+url+'" target="coord_'+coord+'">'+positions[1]+'</a>';
    //} else {
    return '<a href="'+url+'" target="coord_'+coord+'">'+coord+'</a>';
    //}
}

// function populateLDtraitWarnings(data) {

//     if(data.details.warnings && data.details.warnings.length == 0) {
//         $('#ldtrait-warning').hide();
//     } else {
//         $('#ldtrait-warning').show();
//     }
//     ko.mapping.fromJS(ldtraitData, ldtraitModel);

//     // Populate Thinned SNP List after rs_numbers that triggered warnings are removed
//     populateSNPlistLDtrait(data);

// }

function populateSNPwarnings(data) {

    snpclipData.warnings = [];

    $.each(data.filtered, function( index, value ){

        var filtered = {
            rs_number: index,
            position: value[0],
            alleles: value[1],
            comment: value[2],
            rs_number_link: anchorRSnumber(index),
            position_link: anchorRSposition(value[0], index)
        };

        if(filtered.comment != undefined) {
            if(!filtered.comment.includes("Variant kept.") && !filtered.comment.includes("Variant in LD")) {
                // Place message on the warning table.
                // console.log("Push to warnings: " + filtered.rs_number + " " + filtered.comment);
                snpclipData.warnings.push(filtered);

                // Remove rs_numbers with warnings from thinned snp_list
                var index = data.snp_list.indexOf(filtered.rs_number);
                if (index > -1) {
                    data.snp_list.splice(index, 1);
                }   
                
            }
        } else {
            // console.log("filtered.comment is UNDEFINED " + filtered.rs_number);
            // console.log(JSON.stringify(filtered));
            snpclipData.warnings.push(filtered);

            // Remove rs_numbers with warnings from thinned snp_list
            var index = data.snp_list.indexOf(filtered.rs_number);
            if (index > -1) {
                data.snp_list.splice(index, 1);
            }   
            
        }
    });

    //console.log("Warning Data");
    //console.dir(snpclipData.warnings);

    if(snpclipData.warnings.length == 0) {
        $('#snpclip-warning').hide();
    } else {
        $('#snpclip-warning').show();
    }
    ko.mapping.fromJS(snpclipData, snpclipModel);

    // Populate Thinned SNP List after rs_numbers that triggered warnings are removed
    populateSNPlist(data);

}

function loadLDtraitDetails(data, rs_number) {
    console.log("ldTraitRaw", data);
    console.log("rs_number", rs_number);

    RefreshTable('#new-ldtrait', data.details[rs_number]);
    $('#new-ldtrait_wrapper').show();

    $('#ldtrait-detail-title').text("Details for " + rs_number);
}

function loadLDtraitWarnings(data) {
    console.log("ldTraitRaw", data);

    RefreshTable('#new-ldtrait-warnings', data.details.warnings);
    $('#new-ldtrait-warnings_wrapper').show();
}

function loadSNPdetails(data, rs_number) {

    snpclipData.details =[];
    /*
    console.log("Here is the rs_number to populate");
    console.log("rs_number: "+rs_number);
    console.dir(data.details);
    console.log("find key for the rs_number");

    console.log("Found one::::");
    console.dir(data.details[rs_number]);
    */
    var found = false;
    var match = 'Variant in LD with ' + rs_number;
;

    $.each(data.details, function( index, value ){
        var detail = {
            rs_number: index,
            position: value[0],
            alleles: value[1],
            comment: value[2],
            rs_number_link: anchorRSnumber(index),
            position_link: anchorRSposition(value[0], index)
        };
        if(detail.rs_number == rs_number) {
            found = true;
        }
        if(found) {
            if(detail.comment != undefined) {
                if((detail.rs_number == rs_number && detail.comment.includes("Variant kept.")) ||
                    detail.comment.includes(match)) {
                    snpclipData.details.push(detail);
                } 
            } 
            // else {
            //     console.log("detail.comment is UNDEFINED " + detail.rs_numbers);
            //     // console.log(JSON.stringify(detail));
            //     snpclipData.warnings.push(detail);
            // }
        }
    });

    //console.dir(snpclipData);
    //console.log(JSON.stringify(snpclipData));
    ko.mapping.fromJS(snpclipData, snpclipModel);
    $('#snpclip-detail-title').text("Details for "+rs_number);
}

function initTrait(data) {

    ldTraitRaw = data;

    // populateLDtraitWarnings(data);
    // populateSNPlist(data);
    //loadSNPdetails(data, rs_number);

    if(data.details.warnings && data.details.warnings.length > 0) {
        $('#ldtrait-warnings-button').show();
    } else {
        $('#ldtrait-warnings-button').hide();
    }
}

function initClip(data) {

    ldClipRaw = data;

    populateSNPwarnings(data);
    // populateSNPlist(data);
    //loadSNPdetails(data, rs_number);
    if(snpclipData.warnings.length == 0) {
        $('#snpclip-warnings-button').hide();
    } else {
        $('#snpclip-warnings-button').show();
    }
}

function formatLDhapData(data) {

    //console.log("get the two main parts of the data as hplotypes and snps");
    //var indels = [];
    var haplotypes = data.haplotypes;

    //console.dir(haplotypes);

    var snps = data.snps;
    var ldhapTable = {
        footer : [],
        rows : []
    };
    //Get the indels from the haplotypes
    $.each( haplotypes, function( key, value ) {
        haplotypes[key].indels = value.Haplotype.split("_");
    });

    // Convert haplotypes to footer
    for (key in haplotypes) {
        //console.log(key);
        //console.dir(haplotypes[key]);
        var obj = {
            Count : haplotypes[key].Count,
            Frequency : haplotypes[key].Frequency,
            Haplotype : haplotypes[key].indels
            /* Haplotype : ["A", "GGA", "-", 'G'] */
        };
        // Add Haplotypes with a frequency of 1% or greater.
        if (haplotypes[key].Frequency * 100 > 1) {
            ldhapTable.footer.push(obj);
        }
    }
    // Convert snps to rows.
    for (key in snps) {
        var obj = {
            Alleles : snps[key].Alleles,
            Coord : snps[key].Coord,
            RS : snps[key].RS,
            Haplotypes : []
        };
        ldhapTable.rows.push(obj);
    }
    // Add haplotypesHTML
    $.each(ldhapTable.rows, function(index, value) {
        // Get all the haplotypes in pivot order
        $.each(ldhapTable.footer, function(index2, value2) {

            value.Haplotypes[index2] = value2.Haplotype[index];

        });
    });

    //console.log('ldhapTable');
    //console.dir(ldhapTable);
    var obj = {
        out_final : ldhapTable
    }
    //console.dir(obj);
    //console.info("LDhap ENDS here:");

    return ldhapTable;
}

function updateLDmatrix() {
    var id = "ldmatrix";

    var $btn = $('#' + id).button('loading');

    var snps = DOMPurify.sanitize($('#' + id + '-file-snp-numbers').val());
    var population = getPopulationCodes(id+'-population-codes');
    var r2_d;

    if($('#matrix_color_r2').hasClass('active')) {
        r2_d='r2'; // i.e. R2
        $("#ldmatrix-legend").attr('src', 'LDmatrix_legend_R2.png');
    } else {
        r2_d='d';  // i.e.  Dprime
        $("#ldmatrix-legend").attr('src', 'LDmatrix_legend_Dprime.png');
    }

    var ldmatrixInputs = {
        snps : snps,
        pop : population.join("+"),
        reference : Math.floor(Math.random() * (99999 - 10000 + 1)),
        r2_d : r2_d
    };
    //console.log('ldmatrixInputs');
    //console.dir(ldmatrixInputs);

    var url = restServerUrl + "/ldmatrix";
    var ajaxRequest = $.ajax({
        type : 'GET',
        url : url,
        data : ldmatrixInputs
    });

    ajaxRequest.success(function(data) {
        // if(typeof data == 'string') {
        //     $('#ldmatrix-bokeh-graph').empty().append(data);
        //     $('#' + id + '-progress-container').hide();
        //     $('#' + id + '-results-container').show();
        //     getLDmatrixResults(ldmatrixInputs.reference + ".json",
        //             ldmatrixInputs.reference);
        // } else {
        //     displayError(id, data);
        // }

        // create bokeh object with output_backend=canvas from svg
        var dataString = data;
        var dataCanvas = new Object([dataString]);

        var jsonObjCanvas;
        if(typeof dataCanvas == 'string') {
            jsonObjCanvas = JSON.parse(dataCanvas);
        } else {
            jsonObjCanvas = dataCanvas;
        }

        // generate shown canvas graph and hidden svg graph
        if (displayError(id, jsonObjCanvas) == false) {
            $('#ldmatrix-bokeh-graph').empty().append(dataCanvas);

            // place Download PDF button
	        $('#' + id + '-export-dropdown').empty().prepend('<div class="dropdown pull-right"><button class="btn btn-default dropdown-toggle" type="button" id="ldmatrix-menu1" data-toggle="dropdown" disabled>Exporting Plot <i class="fa fa-spinner fa-pulse"></i><span class="sr-only">Loading</span></button><ul class="dropdown-menu " role="menu" aria-labelledby="menu1" style="overflow: hidden;"><li role="presentation"><a role="menuitem" id="ldmatrix-downloadSVG" class="text-center" tabindex="-1" href="#">SVG</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" id="ldmatrix-downloadPDF" class="text-center" tabindex="-1" href="#">PDF</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" id="ldmatrix-downloadPNG" class="text-center" tabindex="-1" href="#">PNG</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" id="ldmatrix-downloadJPEG" class="text-center" tabindex="-1" href="#">JPEG</a></li></ul></div>');
            $("#ldmatrix-downloadSVG").click(function(e) {
                e.preventDefault();
                var matrix_plot = "tmp/matrix_plot_" + ldmatrixInputs.reference + ".svg";
                window.open( matrix_plot, "_blank" )
            });
            $("#ldmatrix-downloadPDF").click(function(e) {
                e.preventDefault();
                var matrix_plot = "tmp/matrix_plot_" + ldmatrixInputs.reference + ".pdf";
                window.open( matrix_plot, "_blank" )
            });
            $("#ldmatrix-downloadPNG").click(function(e) {
                e.preventDefault();
                var matrix_plot = "tmp/matrix_plot_" + ldmatrixInputs.reference + ".png";
                window.open( matrix_plot, "_blank" )
            });
            $("#ldmatrix-downloadJPEG").click(function(e) {
                e.preventDefault();
                var matrix_plot = "tmp/matrix_plot_" + ldmatrixInputs.reference + ".jpeg";
                window.open( matrix_plot, "_blank" )
            });
            
            // enable button once .svg file is generated from subprocess
            var fileURL = "/tmp/matrix_plot_" + ldmatrixInputs.reference + ".jpeg";
            checkFile(id, fileURL, 180);

            $('#' + id + '-results-container').show();
            getLDmatrixResults(ldmatrixInputs.reference + ".json", ldmatrixInputs.reference);
        } else {
            displayError(id, dataCanvas);
        }

        $("#"+id+"-loading").hide();

    });
    ajaxRequest.fail(function(jqXHR, textStatus) {
        displayCommFail(id, jqXHR, textStatus);
    });
    ajaxRequest.always(function() {
        $btn.button('reset');
        setTimeout(function(){var checkbox=$(".bk-toolbar-inspector").children().first();
        $(checkbox).attr('id', 'hover');
        $(checkbox).append('<label for="hover" class="sr-only">Hover Tool</label>');},100);
    });

    hideLoadingIcon(ajaxRequest, id);
}

function addLDMatrixHyperLinks(request) {
    $('#ldmatrix-DPrime').attr('href', 'tmp/d_prime_' + request + '.txt');
    $('#ldmatrix-R2').attr('href', 'tmp/r2_' + request + '.txt');
}
/*
function updateLDproxyProgressBar(id, seconds) {

    var milliseconds = seconds * 1000;
    // Divide number of milliseconds to get 100 to get 100 updates
    var delay = milliseconds / 100;

    $('#' + id + '-progress').show();
    var progressBar = $('#ldproxy-progress-bar');
    width = 0;

    progressBar.width(width);

    var interval = setInterval(function() {
        width += 1;
        progressBar.css('width', width + '%').attr('aria-valuenow',
                width.toString() + '%');
        progressBar.html('<span>' + width.toString() + '% Complete</span>');
        if (width >= 100) {
            clearInterval(interval);
            return;
        }
    }, delay);
}
*/
/*
function createPopulationDropdown(id) {

    alert("createPop");
    $('#' + id + '-population-codes')
        .multiselect(
        {
            enableClickableOptGroups : true,
            buttonWidth : '180px',
            maxHeight : 500,
            includeSelectAllOption : true,
            dropRight : true,
            allSelectedText : 'All Populations',
            nonSelectedText : 'Select Population',
            numberDisplayed : 4,
            selectAllText : 'All Populations',

            // buttonClass: 'btn btn-link',
            buttonText : function(options, select) {
                if (options.length === 0) {
                    return '<span class="pull-left">'
                            + this.nonSelectedText + '</span>'
                            + ' <b class="caret"></b>';
                } else if (options.length == $('option', $(select)).length) {
                    return '<span class="pull-left">'
                            + this.nonSelectedText + '</span>'
                            + ' <b class="caret"></b>';
                } else if (options.length > this.numberDisplayed) {
                    return '<span class="badge pull-left">'
                            + options.length + '</span> '
                            + this.nSelectedText
                            + ' <b class="caret"></b>';
                } else {
                    var selected = '';
                    options.each(function() {
                        // var label = $(this).attr('label') :
                        // $(this).html();
                        selected += $(this).val() + '+';
                    });

                    return selected.substr(0, selected.length - 1)
                            + ' <b class="caret"></b>';
                }
            },
            buttonTitle : function(options, select) {
                if (options.length === 0) {
                    return this.nonSelectedText;
                } else {
                    var selected = '';
                    options.each(function() {
                        selected += $(this).text() + '\n';
                    });
                    return selected;
                }
            },
            onChange : function(option, checked) {
                alert("You changed something");
            }
        });
}
*/

function updateLDproxy() {
    var id = "ldproxy";
    var $btn = $('#' + id).button('loading');
    var population = getPopulationCodes(id+'-population-codes');
    var r2_d;

    if($('#proxy_color_r2').hasClass('active')) {
        r2_d='r2'; // i.e. R2
        $('#ldproxy-genome').html("View R<sup>2</sup> data in UCSC Genome Browser");
        //$("#ldmatrix-legend").attr('src', 'LDmatrix_legend_R2.png');
    } else {
        r2_d='d';  // i.e.  Dprime
        $('#ldproxy-genome').html("View D' data in UCSC Genome Browser");
        //$("#ldmatrix-legend").attr('src', 'LDmatrix_legend_Dprime.png');
    }

    var ldproxyInputs = {
        "var" : $('#ldproxy-snp').val(),
        pop : population.join("+"),
        reference : Math.floor(Math.random() * (99999 - 10000 + 1)),
        r2_d : r2_d
    };

    updateHistoryURL(id, ldproxyInputs);

    //console.log(location.hostname);

    $('#ldproxy-genome').attr('href',
        'http://genome.ucsc.edu/cgi-bin/hgTracks?db=hg19&hgt.customText=http://'+location.hostname+'/tmp/track'
        + ldproxyInputs.reference + '.txt');

    //console.dir(ldproxyInputs);
    $('#ldproxy-results-link').attr('href','tmp/proxy' + ldproxyInputs.reference + '.txt');
    var url = restServerUrl + "/ldproxy";
    var ajaxRequest = $.ajax({
        type : "GET",
        url : url,
        data : ldproxyInputs
    });
    ajaxRequest.success(function(data) {
        // if (displayError(id, data) == false) {
        //     $('#' + id + '-progress-container').hide();
        //     $('#ldproxy-bokeh-graph').empty().append(data);
        //     $('#' + id + '-results-container').show();
        //     getLDProxyResults('proxy'+ldproxyInputs.reference+".json");
        // }
        // $("#"+id+"-loading").hide();

        // create bokeh object with output_backend=canvas from svg
        var dataString = data;
        var dataCanvas = new Object([dataString]);

        var jsonObjCanvas;
        if(typeof dataCanvas == 'string') {
            jsonObjCanvas = JSON.parse(dataCanvas);
        } else {
            jsonObjCanvas = dataCanvas;
        }

        // display graph if no errors
        if (displayError(id, jsonObjCanvas) == false) {
            $('#ldproxy-bokeh-graph').empty().append(dataCanvas);
 
            // place Download PDF button
	        $('#' + id + '-export-dropdown').empty().prepend('<div class="dropdown pull-right"><button class="btn btn-default dropdown-toggle" type="button" id="ldproxy-menu1" data-toggle="dropdown" disabled>Exporting Plot <i class="fa fa-spinner fa-pulse"></i><span class="sr-only">Loading</span></button><ul class="dropdown-menu " role="menu" aria-labelledby="menu1" style="overflow: hidden;"><li role="presentation"><a role="menuitem" id="ldproxy-downloadSVG" class="text-center" tabindex="-1" href="#">SVG</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" id="ldproxy-downloadPDF" class="text-center" tabindex="-1" href="#">PDF</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" id="ldproxy-downloadPNG" class="text-center" tabindex="-1" href="#">PNG</a></li><li role="presentation" class="divider"></li><li role="presentation"><a role="menuitem" id="ldproxy-downloadJPEG" class="text-center" tabindex="-1" href="#">JPEG</a></li></ul></div>');
            $("#ldproxy-downloadSVG").click(function(e) {
                e.preventDefault();
                var proxy_plot = "tmp/proxy_plot_" + ldproxyInputs.reference + ".svg";
                window.open( proxy_plot, "_blank" )
            });
            $("#ldproxy-downloadPDF").click(function(e) {
                e.preventDefault();
                var proxy_plot = "tmp/proxy_plot_" + ldproxyInputs.reference + ".pdf";
                window.open( proxy_plot, "_blank" )
            });
            $("#ldproxy-downloadPNG").click(function(e) {
                e.preventDefault();
                var proxy_plot = "tmp/proxy_plot_" + ldproxyInputs.reference + ".png";
                window.open( proxy_plot, "_blank" )
            });
            $("#ldproxy-downloadJPEG").click(function(e) {
                e.preventDefault();
                var proxy_plot = "tmp/proxy_plot_" + ldproxyInputs.reference + ".jpeg";
                window.open( proxy_plot, "_blank" )
            });

            // enable button once .svg file is generated from subprocess
            var fileURL = "/tmp/proxy_plot_" + ldproxyInputs.reference + ".jpeg";
            checkFile(id, fileURL, 180);

            $('#' + id + '-results-container').show();
            getLDProxyResults('proxy'+ldproxyInputs.reference+".json");
        } else {
            displayError(id, dataCanvas);
        }
        $("#"+id+"-loading").hide();

    });
    ajaxRequest.fail(function(jqXHR, textStatus) {
        displayCommFail(id, jqXHR, textStatus);
    });
    ajaxRequest.always(function() {
        $btn.button('reset');
        setTimeout(function(){var checkbox=$(".bk-toolbar-inspector").children().first();
        $(checkbox).attr('id', 'hover');
        $(checkbox).append('<label for="hover" class="sr-only">Hover Tool</label>');},100);
    });
}

function hideLoadingIcon(ajaxRequest, id) {
    ajaxRequest.done(function(msg) {
        //hide loading icon
        $('#'+id+"-loading").hide();
    });
}

function getLDProxyResults(jsonfile) {
    var id = "ldproxy";
    var url = "tmp/"+jsonfile;
    //console.info("Here is the LOG file");
    //console.log(url);

    var ajaxRequest = $.ajax({
        type : "GET",
        url : url
    });
    ajaxRequest.success(function(data) {
        //catch error and warning in json
        if (displayError(id, data) == false) {
            RefreshTable('#new-ldproxy', data);
            //ko.mapping.fromJS(data, ldproxyModel);
        }

    });
    ajaxRequest.fail(function(jqXHR, textStatus) {
        displayCommFail(id, jqXHR, textStatus);
    });
    hideLoadingIcon(ajaxRequest, id);
}

function getLDAssocResults(jsonfile) {
    var id = "ldassoc";
    var url = "tmp/"+jsonfile;
    //console.info("Here is the LOG file");
    //console.log(url);

    var ajaxRequest = $.ajax({
        type : "GET",
        url : url
    });
    ajaxRequest.success(function(data) {
        //catch error and warning in json
        // console.warn("HERE IS THE ldassoc data");
        // console.dir(data);
        if (displayError(id, data) == false) {
            RefreshTable('#new-ldassoc', data);
            $("#ldassoc-namespace").empty();
            $("#ldassoc-namespace").append(
                $("<div>").append("namespace("+
                    JSON.stringify(data.report.namespace)
                    +")"
                )
            );
            $("#ldassoc-namespace").append(
                $("<div>").append("region = "+data.report.region)
            );
            $("#ldassoc-stats").empty().append(
                $("<li>").append("Number of Individuals: <b>"+data.report.statistics.individuals+"</b>")
            );
            $("#ldassoc-stats").append(
                $("<li>").append("Variants in Region: <b>"+data.report.statistics.in_region+"</b>")
            );
            $("#ldassoc-stats").append(
                $("<li>").append("Run time: <b>"+Number(data.report.statistics.runtime).toFixed(2)+"</b> seconds")
            );
            //Adjust links
            if($('#assoc-matrix-color-r2').hasClass('active')) {
                $('#ldassoc-genome').html("View R<sup>2</sup> data in UCSC Genome Browser");
                //$("#ldmatrix-legend").attr('src', 'LDmatrix_legend_R2.png');
            } else {
                $('#ldassoc-genome').html("View D' data in UCSC Genome Browser");
                //$("#ldmatrix-legend").attr('src', 'LDmatrix_legend_Dprime.png');
            }
            //transcript flag?
            if($('#assoc-transcript').hasClass('active')) {
                //Yes

            } else {
                //No
            }
            //annotate flag?
            if($('#assoc-annotate').hasClass('active')) {
                //Yes

            } else {
                //No

            }

        }
    });
    ajaxRequest.fail(function(jqXHR, textStatus) {
        displayCommFail(id, jqXHR, textStatus);
    });
    hideLoadingIcon(ajaxRequest, id);
}

function getLDmatrixResults(jsonfile, request) {
    var id = "ldmatrix";
    var url = "tmp/matrix"+jsonfile;

    var ajaxRequest = $.ajax({
        type : "GET",
        url : url
    });

    ajaxRequest.success(function(data) {
        //catch error and warning in json
        if (displayError(id, data) == false) {
            addLDMatrixHyperLinks(request);
            $('#'+id+"-download-links").show();
        }
    });
    ajaxRequest.fail(function(jqXHR, textStatus) {
        displayCommFail(id, jqXHR, textStatus);
    });
    ajaxRequest.always(function() {
    });
}

function updateHistoryURL(id, inputs) {
    //console.log('updateHistoryURL: id:'+id+' inputs:'+inputs);
    //Update url with new vars
    var params = $.extend({}, inputs);
    delete params.reference;
    if(params.pop) {
        var population;
        var totalPopulations;
        population =  $('#'+id+'-population-codes').val();
        params.pop = population.join("+");
    }

    params["tab"] = id;
    var recursiveEncoded = $.param( params );
    //console.log(recursiveEncoded);
    window.history.pushState({},'', "?"+ recursiveEncoded);
    $("#"+id+"-tab-anchor").attr("data-url-params", recursiveEncoded);

    //console.log(JSON.stringify(params.pop));

}

function updateLDpair() {
    var id = 'ldpair';
    var $btn = $('#' + id).button('loading');

    var population = getPopulationCodes(id+'-population-codes');

    //console.log("LD Pair");
    //console.log('population');
    //console.dir(population);
        var reference="ref" + Math.floor(Math.random() * (99999 - 10000 + 1))+ 10000;
    var ldpairInputs = {
        var1 : $('#ldpair-snp1').val(),
        var2 : $('#ldpair-snp2').val(),
        pop : population.join("+"),
        reference : reference
    };
    //console.log("ldpairInputs");
    //console.dir(ldpairInputs);

    updateHistoryURL(id, ldpairInputs);

    var url = restServerUrl + "/ldpair";

    var ajaxRequest = $.ajax({
        type : "GET",
        url : url,
        data : ldpairInputs,
        contentType : 'application/json' // JSON
    });

    ajaxRequest.success(function(data) {
        if (displayError(id, data) == false) {
            ko.mapping.fromJS(data, ldpairModel);
            $('#' + id + '-results-container').show();
            addLDpairHyperLinks(data);
        }
        $("#ldpair_results").text("Download Results");
        $('#ldpair_results').css("text-decoration", "underline");
        $("#ldpair_results").attr("href", "tmp/LDpair_"+reference+".txt");
    });
    ajaxRequest.fail(function(jqXHR, textStatus) {
        displayCommFail(id, jqXHR, textStatus);
    });
    ajaxRequest.always(function() {
        $btn.button('reset');
    });
    hideLoadingIcon(ajaxRequest, id);
}

var map1, map2, map3;
// Initialize and add the map
function initMap() {
    var initOptions = {
        zoom: 2, 
        center: {
            lat: 30, 
            lng: 0
        },
        controlSize: 24
        // disableDefaultUI: true
        // streetViewControl: false
    };
    map1 = new google.maps.Map(document.getElementById('map1'), initOptions);
    map2 = new google.maps.Map(document.getElementById('map2'), initOptions);
    map3 = new google.maps.Map(document.getElementById('map3'), initOptions);

    var LDlegend = document.getElementById('ldpop-ld-legend');
    var MAFlegend1 = document.getElementById('ldpop-maf-legend1');
    var MAFlegend2 = document.getElementById('ldpop-maf-legend2');
    map1.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(LDlegend);
    map2.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(MAFlegend1);
    map3.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(MAFlegend2);

    // add alt text to maps
    google.maps.event.addListener(map1, 'tilesloaded', function() {
        var images1 = document.querySelectorAll('#map1 img');
        images1.forEach(function(image1) {
            image1.alt = "Google Maps API control";
        });
    });
    google.maps.event.addListener(map2, 'tilesloaded', function() {
        var images2 = document.querySelectorAll('#map2 img');
        images2.forEach(function(image2) {
            image2.alt = "Google Maps API control";
        });
    });
    google.maps.event.addListener(map3, 'tilesloaded', function() {
        var images3 = document.querySelectorAll('#map3 img');
        images3.forEach(function(image3) {
            image3.alt = "Google Maps API control";
        });
    });

    // sample marker test google maps api local
    // var myLatLng = {lat: -25.363, lng: 131.044};
    // let icon = {
    //     path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
    //     strokeColor: "black",
    //     fillColor: "red",
    //     fillOpacity: 1,
    //     scale: .85,
    //     labelOrigin: new google.maps.Point(0, -30)
    // }
    // var marker = new google.maps.Marker({
    //     position: myLatLng,
    //     map: map1,
    //     icon: icon,
    //     title: 'Hello World!',
    //     label: {
    //         text: "GWK",
    //         fontSize: "12px"
    //     }
    // });
}

function setLDColor(LD) {
    var LDColorData = {
        0: "#FFFFFF",
        0.0 : "#FFFFFF",
        0.1 : "#FBE6E6",
        0.2 : "#F8D3D2",
        0.3 : "#F4B5B4",
        0.4 : "#F19E9C",
        0.5 : "#EF8683",
        0.6 : "#EC706B",
        0.7 : "#EB5A54",
        0.8 : "#EB483F",
        0.9 : "#E9392D",
        1.0 : "#E9392D",
        1: "#E9392D"
    };
    // round r2 to 1 decimal place and return color
    var round_LD = Math.round(LD * 10 ) / 10;
    return LDColorData[round_LD];
}

function colorMarkerLD(LD, location) {
    // console.log("LD", LD);
    var r2 = location[7];
    var dprime = location[8];
    // console.log("R2: ", r2);
    // console.log("D\': ", dprime);
    if (LD == "r2") {
        if (r2 == "NA") {
            return "#E9F3F9";
        } else {
            return setLDColor(r2);
        }
    } else {
        if (dprime == "NA") {
            return "#E9F3F9";
        } else {
            return setLDColor(dprime);
        }
    }
}

function getMinorAllele(variantIndex, locations) {
    // console.log(variantIndex);
    var alleles = locations[0][variantIndex].replace(/[\s\%]/g, '').split(/[\,\:]/);
    var allele1 = alleles[0];
    var allele2 = alleles[2];
    var allele1PopSize = 0;
    var allele2PopSize = 0;
    var pop_groups = ["ALL", "AFR", "AMR", "EAS", "EUR", "SAS"];
    for (i = 0; i < locations.length; i++) {
        if (!pop_groups.includes(locations[i][0])) {
            // console.log(locations[i][0]);
            let alleleData = locations[i][variantIndex].replace(/[\s\%]/g, '').split(/[\,\:]/);
            let allele1Freq = parseFloat(alleleData[1]);
            let allele2Freq = parseFloat(alleleData[3]);
            if (allele1Freq == allele2Freq) {
                allele1PopSize = allele1PopSize + locations[i][1];
                allele2PopSize = allele2PopSize + locations[i][1];
            } else if (allele1Freq < allele2Freq) {
                allele1PopSize = allele1PopSize + locations[i][1];
            } else {
                allele2PopSize = allele2PopSize + locations[i][1];
            }
        }
    }
    // console.log("Allele 1: ", allele1);
    // console.log("Allele 1 Pop Size: ", allele1PopSize);
    // console.log("Allele 2: ", allele2);
    // console.log("Allele 2 Pop Size: ", allele2PopSize);
    if (allele1PopSize == allele2PopSize) {
        if (allele1 < allele2) {
            return allele1;
        } else {
            return allele2;
        }
    } else if (allele1PopSize > allele2PopSize) {
        return allele1;
    } else {
        return allele2;
    }
}

function setMAFColor(MAF) {
    var MAFColorData = {
        0: "#FFFFFF",
        0.0 : "#FFFFFF",
        0.1 : "#E5E7FD",
        0.2 : "#D0D4FB",
        0.3 : "#B3BAFA",
        0.4 : "#9AA3F8",
        0.5 : "#828EF7",
        0.6 : "#6877F6",
        0.7 : "#4E60F5",
        0.8 : "#354CF5",
        0.9 : "#1B37F3",
        1.0 : "#1B37F3",
        1: "#1B37F3"
    };
    // round MAF to 1 decimal place and return color
    var round_MAF = Math.round(MAF * 10 ) / 10;
    return MAFColorData[round_MAF];
}

function colorMarkerMAF(minorAllele, location) {
    // console.log("Minor Allele: ", minorAllele);
    var alleleData = location[5];
    var alleleData = alleleData.replace(/[\s\%]/g, '').split(/[\,\:]/);
    var alleleDataHash = {};
    alleleDataHash[alleleData[0]] = parseFloat(alleleData[1]);
    alleleDataHash[alleleData[2]] = parseFloat(alleleData[3]);
    var MAF = alleleDataHash[minorAllele] / 100.0;
    return setMAFColor(MAF);
}

var markersArray = [];
function clearOverlays() {
    for (var i = 0; i < markersArray.length; i++ ) {
        markersArray[i].setMap(null);
    }
    markersArray.length = 0;
}

function resetMarkerZIndex() {
    var count = 0;
    for (var i = 0; i < markersArray.length; i++ ) {
        count = count + 1;
        markersArray[i].setZIndex(count);
    }
}

function addMarkers(data) {
    var locations = data.locations;
    var rs1MinorAllele = getMinorAllele(2, data.aaData);
    var rs2MinorAllele = getMinorAllele(3, data.aaData);
    // console.log("Minor Allele rs#1: ", rs1MinorAllele);
    // console.log("Minor Allele rs#2: ", rs2MinorAllele);
    // rs#1 Frequencies map
    var map1_infowindow = new google.maps.InfoWindow();
    var map1_marker, map1_i;
    for (map1_i = 0; map1_i < locations.rs1_rs2_LD_map.length; map1_i++) {
        let icon = {
            path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
            strokeColor: "black",
            fillColor: colorMarkerLD(data.inputs.LD, locations.rs1_rs2_LD_map[map1_i]),
            fillOpacity: 1,
            scale: .85,
            labelOrigin: new google.maps.Point(0, -30)
        }
        map1_marker = new google.maps.Marker({
            position: {
                lat: locations.rs1_rs2_LD_map[map1_i][3], 
                lng: locations.rs1_rs2_LD_map[map1_i][4]
            }, 
            icon: icon,
            map: map1,
            label: {
                text: locations.rs1_rs2_LD_map[map1_i][0],
                fontSize: "12px"
            },
            title: "(" + locations.rs1_rs2_LD_map[map1_i][0] + ") " + locations.rs1_rs2_LD_map[map1_i][1]
        });
        markersArray.push(map1_marker);
        google.maps.event.addListener(map1_marker, 'click', (function(map1_marker, map1_i) {
            return function() {
                var contentString = '<div><b>(' + locations.rs1_rs2_LD_map[map1_i][0] + ') - ' + locations.rs1_rs2_LD_map[map1_i][1] + '</b><hr style="margin-top: 5px; margin-bottom: 5px;">' + 
                    '<b>' + data.inputs.rs1 + '</b>: ' + locations.rs1_rs2_LD_map[map1_i][5] + '<br>' + 
                    '<b>' + data.inputs.rs2 + '</b>: ' + locations.rs1_rs2_LD_map[map1_i][6] + '<br>' + 
                    '<b>R<sup>2</sup></b>: ' + locations.rs1_rs2_LD_map[map1_i][7] + '<br>' + 
                    '<b>D\'</b>: ' + locations.rs1_rs2_LD_map[map1_i][8] + '</div>';
                map1_infowindow.setContent(contentString);
                map1_infowindow.open(map1, map1_marker);
                resetMarkerZIndex();
                map1_marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
            }
        })(map1_marker, map1_i));
    }
    // rs#2 Frequencies map
    var map2_infowindow = new google.maps.InfoWindow();
    var map2_marker, map2_i;
    for (map2_i = 0; map2_i < locations.rs1_map.length; map2_i++) {
        let icon = {
            path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
            strokeColor: "black",
            fillColor: colorMarkerMAF(rs1MinorAllele, locations.rs1_map[map2_i]),
            fillOpacity: 1,
            scale: .85,
            labelOrigin: new google.maps.Point(0, -30)
        }
        map2_marker = new google.maps.Marker({
            position: {
                lat: locations.rs1_map[map2_i][3], 
                lng: locations.rs1_map[map2_i][4]
            },
            icon: icon,
            map: map2,
            label: {
                text: locations.rs1_map[map2_i][0],
                fontSize: "12px"
            },
            title: "(" + locations.rs1_map[map2_i][0] + ") " + locations.rs1_map[map2_i][1]
        });
        markersArray.push(map2_marker);
        google.maps.event.addListener(map2_marker, 'click', (function(map2_marker, map2_i) {
            return function() {
                var contentString = '<div><b>(' + locations.rs1_map[map2_i][0] + ') - ' + locations.rs1_map[map2_i][1] + '</b><hr style="margin-top: 5px; margin-bottom: 5px;">' + 
                    locations.rs1_map[map2_i][5] + '</div>';
                map2_infowindow.setContent(contentString);
                map2_infowindow.open(map2, map2_marker);
                resetMarkerZIndex();
                map2_marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
            }
        })(map2_marker, map2_i));
    }
    // rs#1-rs#2 LD map
    var map3_infowindow = new google.maps.InfoWindow();
    var map3_marker, map3_i;
    for (map3_i = 0; map3_i < locations.rs2_map.length; map3_i++) {
        let icon = {
            path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
            strokeColor: "black",
            fillColor: colorMarkerMAF(rs2MinorAllele, locations.rs2_map[map3_i]),
            fillOpacity: 1,
            scale: .85,
            labelOrigin: new google.maps.Point(0, -30)
        }
        map3_marker = new google.maps.Marker({
            position: {
                lat: locations.rs2_map[map3_i][3], 
                lng: locations.rs2_map[map3_i][4]
            }, 
            icon: icon,
            map: map3,
            label: {
                text: locations.rs2_map[map3_i][0],
                fontSize: "12px"
            },
            title: "(" + locations.rs2_map[map3_i][0] + ") " + locations.rs2_map[map3_i][1]
        });
        markersArray.push(map3_marker);
        google.maps.event.addListener(map3_marker, 'click', (function(map3_marker, map3_i) {
            return function() {
                var contentString = '<div><b>(' + locations.rs2_map[map3_i][0] + ') - ' + locations.rs2_map[map3_i][1] + '</b><hr style="margin-top: 5px; margin-bottom: 5px;">' + 
                    locations.rs2_map[map3_i][5] + '</div>';
                map3_infowindow.setContent(contentString);
                map3_infowindow.open(map3, map3_marker);
                resetMarkerZIndex();
                map3_marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
            }
        })(map3_marker, map3_i));
    }
}

function exportMap(mapNum, mapType, imageType) {
    // console.log("EXPORT MAP");
    // display loading text when map is exporting
    $('#ldpop-menu' + mapNum).html('Exporting Map <i class="fa fa-spinner fa-pulse"></i><span class="sr-only">Loading</span>');
    $('#ldpop-menu' + mapNum).prop('disabled', true);
    // use html2canvas js to convert google maps api div to canvas object
    var map = $('#map' + mapNum).children().children()[0];
    // console.log(map);
    html2canvas(map, {
        useCORS: true,
        allowTaint: false,
        async: true,
        logging: false,
        scale: 2
    }).then(canvas => {
        // convert canvas to image
        var imgSRC = canvas.toDataURL("image/" + imageType);
        // download image
        var a = document.createElement('a');
        a.setAttribute("type", "hidden");
        a.href = imgSRC;
        a.download = mapType + "-map." + imageType;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        // re-enable export dropdown after export is complete
        $('#ldpop-menu' + mapNum).html('Export ' + mapType + ' Map <span class="caret"></span>');
        $('#ldpop-menu' + mapNum).prop('disabled', false);
    });
}

function updateLDpop() {
    var id = 'ldpop';
    var $btn = $('#' + id).button('loading');
    var population = getPopulationCodes(id+'-population-codes');
    var r2_d;

    if($('#pop_ld_r2').hasClass('active')) {
        r2_d = 'r2'; // i.e. R2
        $("#ldpop-ld-legend-img").attr('src', 'LDpop_legend_R2.png');
    } else {
        r2_d = 'd';  // i.e. Dprime
        $("#ldpop-ld-legend-img").attr('src', 'LDpop_legend_Dprime.png');
    }

    var reference="ref" + Math.floor(Math.random() * (99999 - 10000 + 1))+ 10000;
    var ldpopInputs = {
        var1 : $('#ldpop-snp1').val(),
        var2 : $('#ldpop-snp2').val(),
        pop : population.join("+"),
        reference : reference,
        r2_d: r2_d
    };

    updateHistoryURL(id, ldpopInputs);

    var url = restServerUrl + "/ldpop";

    var ajaxRequest = $.ajax({
        type : "GET",
        url : url,
        data : ldpopInputs,
        contentType : 'application/json' // JSON
    });

    ajaxRequest.success(function(data) {
        // console.log(data);
        if (displayError(id, data) == false) {
            $('#' + id + '-results-container').show();
            console.log("LDpop data", data);
            RefreshTable('#new-ldpop', data);
            $("#ldpop_rs1").text(data.inputs.rs1 + " Allele Freq");
            $("#ldpop_rs2").text(data.inputs.rs2 + " Allele Freq");
            $(".ldpop-map1-title").html("<b>" + data.inputs.rs1 + " " + data.inputs.rs2 + " LD" + "</b>");
            $(".ldpop-map2-title").html("<b>" + data.inputs.rs1 + " Allele Frequency" + "</b>");
            $(".ldpop-map3-title").html("<b>" + data.inputs.rs2 + " Allele Frequency" + "</b>");
            clearOverlays();
            addMarkers(data);
        }
        $("#ldpop_results").text("Download Table");
        $('#ldpop_results').css("text-decoration", "underline");
        $("#ldpop_results").attr("href", "tmp/LDpop_"+reference+".txt");
        $("#new-ldpop_filter").after($("#ldpop-download-table"));
        if(!$('#new-ldpop_topInfo').length) {
            $('<div id="new-ldpop_topInfo"></div>').prependTo('#new-ldpop_wrapper');
        }    
        $("#new-ldpop_topInfo").html($("#new-ldpop_info").clone().prop('id', 'new-ldpop_info_clone'));
        $("#new-ldpop_info_clone").css("padding", "0px 10px 0px 0px");
    });
    ajaxRequest.fail(function(jqXHR, textStatus) {
        displayCommFail(id, jqXHR, textStatus);
    });
    ajaxRequest.always(function() {
        $btn.button('reset');
    });
    hideLoadingIcon(ajaxRequest, id);
}

function updateAPIaccess() {
    var id = 'apiaccess';
    var $btn = $('#' + id).button('loading');

    var reference = "ref" + Math.floor(Math.random() * (99999 - 10000 + 1))+ 10000;
    // if institution field was optional
    // var institution_opt = $('#apiaccess-institution').val();
    // if (institution_opt.length == 0) {
    //     institution_opt = "NA"
    // }

    var apiaccessInputs = {
        firstname: $('#apiaccess-firstname').val(),
        lastname: $('#apiaccess-lastname').val(),
        email: $('#apiaccess-email').val(),
        institution: $('#apiaccess-institution').val(),
        reference: reference
    };

    var url = restServerUrl + "/apiaccess/register_web";

    var ajaxRequest = $.ajax({
        type : "GET",
        url : url,
        data : apiaccessInputs,
        contentType : 'application/json' // JSON
    });

    ajaxRequest.success(function(data) {
        $('.modal-title.apiaccess').empty().append(data.message);
        $('.' + id + '-user-email').empty().append(data.email);
        $('#apiblocked-firstname').val(data.firstname);
        $('#apiblocked-lastname').val(data.lastname);
        $('#apiblocked-institution').val(data.institution);
        $('#apiblocked-email').val(data.email);
        // $('#apiblocked-token').val(data.token);
        $('#apiblocked-registered').val(data.registered);
        $('#apiblocked-blocked').val(data.blocked);
        if (data.message.substring(0, 5) == "Thank") {
            // new user
            $('#' + id + '-new-user').modal('show');
        } else if (data.message.substring(0, 5) == "Email") { 
            // existing user
            $('#' + id + '-existing-user').modal('show');
        } else {
            // blocked user
            $('#' + id + '-blocked-user').modal('show');
        }
        $('#' + id + '-loading').hide();
    });
    ajaxRequest.fail(function(jqXHR, textStatus) {
        displayCommFail(id, jqXHR, textStatus);
    });
    ajaxRequest.always(function() {
        $btn.button('reset');
    });
    hideLoadingIcon(ajaxRequest, id);
}

function updateAPIblocked() {
    var id = 'apiblocked';
    var $btn = $('#' + id).button('loading');

    var reference = "ref" + Math.floor(Math.random() * (99999 - 10000 + 1))+ 10000;

    var apiblockedInputs = {
        firstname: $('#apiblocked-firstname').val(),
        lastname: $('#apiblocked-lastname').val(),
        institution: $('#apiblocked-institution').val(),
        email: $('#apiblocked-email').val(),
        // token: $('#apiblocked-token').val(),
        registered: $('#apiblocked-registered').val(),
        blocked: $('#apiblocked-blocked').val(),
        justification: $('#apiblocked-justification').val(),
        reference: reference
    };

    var url = restServerUrl + "/apiaccess/apiblocked_web";

    var ajaxRequest = $.ajax({
        type : "GET",
        url : url,
        data : apiblockedInputs,
        contentType : 'application/json' // JSON
    });

    ajaxRequest.success(function(data) {
        // reset form
        $("#apiblocked-reset").click();
        // hide loading animation
        $('#' + id + '-loading').hide();
        // hide form
        $('#apiblocked-form').hide();
        // hide submit button
        $('#apiblocked').hide();
        // show form submission message
        $('#apiblocked-submit-message').show();
        // change cancel to done button
        $('#apiblocked-done').val("Done");
    });
    ajaxRequest.fail(function(jqXHR, textStatus) {
        displayCommFail(id, jqXHR, textStatus);
    });
    ajaxRequest.always(function() {
        $btn.button('reset');
    });
    hideLoadingIcon(ajaxRequest, id);
}

function displayError(id, data) {
    // Display error or warning if available.
    var error = false;
    if (data.traceback) {
        console.warn("traceback");
        console.warn(data.traceback);
    }
    if (data.warning) {
        $('#' + id + '-message-warning').show();
        $('#' + id + '-message-warning-content').empty().append(data.warning);
        //hide error
        $('#' + id + '-message').hide();
    }

    if (data.error) {
        // ERROR
        $('#' + id + '-message').show();
        $('#' + id + '-message-content').empty().append(data.error);
        //hide warning
        $('#' + id + '-message-warning').hide();

        //matrix specific
        $('#'+id+"-download-links").hide();

        $('#'+id+"-results-container").hide();

        error = true;
    }
    return error;
}

function displayCommFail(id, jqXHR, textStatus) {
    //console.log(textStatus);
    //console.dir(jqXHR);
    console.warn("CommFail\n"+"Status: "+textStatus);
    var message = jqXHR.responseText;
    message += "<p>code: "+jqXHR.status+" - "+textStatus+"</p>";
    message = message.replace("[no address given]", "NCILDlinkWebAdmin@mail.nih.gov");
    $('#' + id + '-message').show();
    $('#' + id + '-message-content').empty().append(message);
    $('#' + id + '-progress').hide();
    $('#' + id+ '-results-container').hide();
    //hide loading icon
    $('#'+id+"-loading").hide();
}


// function displayCommFail(id, jqXHR, textStatus) {
//     console.dir(jqXHR);
//     console.warn("CommFail\n"+"Status: "+textStatus);

//     var message;
//     var errorThrown = "";
//     console.warn("header: " + jqXHR
//     + "\ntextStatus: " + textStatus
//     + "\nerrorThrown: " + errorThrown);
//     //alert('Communication problem: ' + textStatus);
//     // ERROR
//     if(jqXHR.status == 500) {
//         message = 'Internal Server Error: ' + textStatus + "<br>";
//         message += jqXHR.responseText;
//         message += "<br>code("+jqXHR.status+")";
//         message_type = 'warning';
//     } else {
//         message = jqXHR.statusText+" ("+ textStatus + ")<br><br>";
//         message += "The server is temporarily unable to service your request due to maintenance downtime or capacity problems. Please try again later.<br>";
//         message += "<br>code("+jqXHR.status+")";
//         message_type = 'error';
//     }
//     showMessage(id, message, message_type);
// }

// function showMessage(id, message, message_type) {
//     console.log("showMessage");
//     $('#' + id + '-message').show();
//     $('#' + id + '-message-content').empty().append(message);
//     $('#' + id + '-progress').hide();
//     $('#' + id+ '-results-container').hide();
//     //hide loading icon
//     $('#'+id+"-loading").hide();

    //
    //  Display either a warning an error.
    //
    // $("#right_panel").show();
    // $("#help").hide();
    // $("#icon").css('visibility', 'visible');

    // console.log("Show Message");

    // var css_class = "";
    // var header = "";
    // var container_id = id+"-message-container";
    // // console.log(container_id);

    // if(message_type.toUpperCase() == 'ERROR') {
    //     css_class = 'panel-danger';
    //     header = 'Error';
    // } else {
    //     css_class = 'panel-warning';
    //     header = 'Warning';
    // }
    // $("#"+container_id).empty().show();
    // $("#"+container_id).append(
    //     $('<div>')
    //         .addClass('panel')
    //         .addClass(css_class)
    //         .append(
    //             $('<div>')
    //                 .addClass('panel-heading')
    //                 .append(header)
    //                 )
    //         .append(
    //             $('<div>')
    //                 .addClass('panel-body')
    //                 .append(message)
    //                 )
    //     );
// }

function addLDHapHyperLinks(request, ldhapTable) {
    $('#ldhap-snps').attr('href', 'tmp/snps_' + request + '.txt');
    $('#ldhap-haplotypes').attr('href', 'tmp/haplotypes_' + request + '.txt');

    var server;
    var params = {};
    var rs_number;
    var url;
    //server = 'http://genome.ucsc.edu/cgi-bin/hgTracks';
    //console.log("ldhapData");


    $.each(ldhapTable.rows, function(index, value) {
        //console.log(index + ": " + value);
        // Create RSnumber link (Cluster Report)
        server = 'http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi';
        // snp1-rsum
        rs_number = value.RS.substring(2);
        params = {
            rs : rs_number
        };
        url = server + "?" + $.param(params);
        $('#RSnumber_hap_' + index + ' a:first-child').attr('href', url);

        // Create Coord link ()
        server = 'http://genome.ucsc.edu/cgi-bin/hgTracks';
        positions = value.Coord.split(":");
        chr = positions[0];
        mid_value = parseInt(positions[1]);
        offset = 250;
        range = (mid_value - offset) + "-" + (mid_value + offset);
        position = chr + ":" + range;
        rs_number = value.RS;
        params = {
            db:'hg19',
            position : position,
            snp151 : 'pack',
            'hgFind.matches' : rs_number
        };
        url = server + "?" + $.param(params);
        $('#Coord_hap_' + index + ' a:first-child').attr('href', url);
    });

}

function addLDpairHyperLinks(data) {

    // Add snp1-rsum to
    var server;
    var params = {};
    var rs_number;
    var url;
    //
    // Cluster Report:
    //
    server = 'http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi';
    // snp1-rsum
    rs_number = data.snp1.rsnum.substring(2);
    params = {
        rs : rs_number
    };
    url = server + "?" + $.param(params);
    $('#snp1-rsnum').attr('href', url)
    // snp2-rsum
    rs_number = data.snp2.rsnum.substring(2);
    params = {
        rs : rs_number
    };
    url = server + "?" + $.param(params);
    $('#snp2-rsnum').attr('href', url)
    //
    // Genome Browser:
    //
    server = 'http://genome.ucsc.edu/cgi-bin/hgTracks';
    // snp1-coord
    var positions = data.snp1.coord.split(":");
    var chr = positions[0];
    var mid_value = parseInt(positions[1]);
    var offset = 250;
    var range = (mid_value - offset) + "-" + (mid_value + offset);
    var position = chr + ":" + range;
    rs_number = data.snp1.rsnum;
    params = {
        db:'hg19',
        position : position,
        snp151 : 'pack',
        'hgFind.matches' : rs_number
    };
    url = server + "?" + $.param(params);
    $('#snp1-coord').attr('href', url)
    // snp2-coord
    positions = data.snp2.coord.split(":");
    chr = positions[0];
    mid_value = parseInt(positions[1]);
    offset = 250;
    range = (mid_value - offset) + "-" + (mid_value + offset);
    position = chr + ":" + range;
    rs_number = data.snp2.rsnum;
    params = {
        db:'hg19',
        position : position,
        snp151 : 'pack',
        'hgFind.matches' : rs_number
    };
    url = server + "?" + $.param(params);
    $('#snp2-coord').attr('href', url);

}

function addCheckBox(code, description, elementId, platform_class) {
    $("#"+elementId).append(
        $("<div>").append(
            $("<span>").addClass("platform-checkbox").append(
                $("<input>").attr('type','checkbox')
                    .attr('id',code)
                    .attr('value', code)
                    .prop('checked', true)
                    .addClass(platform_class)
                )
            ).append(
            $("<span>").addClass("formw").append(
                $("<label>").attr('for',code)
                    .css("font-weight", "normal")
                    .text(description+" ("+code+")")
                )
        )
    );
}

function buildPlatformSNPchip(data) {

    //Change platforms to multiselect json

    var platforms = JSON.parse(data);
    var illumina = {};
    var affymetrix = {};
    snpchipReverseLookup =[];

    $.each(platforms, function( code, description ) {
        if(description.search("Affymetrix") >= 0) {
            affymetrix[code] = description;
            addCheckBox(code, description, "columnBcheckbox", "affymetrix");
        }
        if(description.search("Illumina") >= 0) {
            illumina[code] = description;
            addCheckBox(code, description, "columnAcheckbox", "illumina");
        }
        snpchipReverseLookup[description] = code;
    });
    $("#selectAllIllumina").prop('checked', true);
    $("#selectAllAffymetrix").prop('checked', true);
    calculateChipTotals();
}

function buildPopulationDropdown(elementId) {

    var htmlText = "";
    var htmlText1 = "<optgroup value='ABBREV' label='(ABBREV) FULLNAME'>\n";
    var htmlText2 = "<option value='ABBREV'>(ABBREV) DETAIL </option>\n";
    for ( var popAbbrev in populations) {
        var population = populations[popAbbrev];
        htmlText += htmlText1
            .replace(/ABBREV/g, popAbbrev)
            .replace("FULLNAME", population.fullName);
        for ( var subPopAbbrev in population.subPopulations) {
            var subDetail = population.subPopulations[subPopAbbrev];
            htmlText += htmlText2
                .replace(/ABBREV/g, subPopAbbrev).replace("DETAIL", subDetail);
        }
        htmlText += "</optgroup>\n";
    }

    $('#' + elementId).html(htmlText);
    //alert(elemtnId);
    $('#' + elementId).multiselect({
        enableClickableOptGroups : true,
        buttonWidth : '180px',
        maxHeight : 500,
        buttonClass : 'btn btn-default btn-ldlink-multiselect',
        includeSelectAllOption : true,
        dropRight : false,
        allSelectedText : 'All Populations',
        nonSelectedText : 'Select Population',
        numberDisplayed : 4,
        selectAllText : ' (ALL) All Populations',
        previousOptionLength: 0,
        maxPopulationWarn: 2,
        maxPopulationWarnTimeout: 5000,
        maxPopulationWarnVisible: false,

        // buttonClass: 'btn btn-link',
        buttonText : function(options, select) {
            //console.log("elementId: "+elementId);
            if(this.previousOptionLength < this.maxPopulationWarn && options.length >= this.maxPopulationWarn) {
                $('#'+elementId+'-popover').popover('show');
                this.maxPopulatinWarnVisible=true;
                setTimeout(function(){
                    $('#'+elementId+'-popover').popover('destroy');
                    this.maxPopulatinWarnVisible=false;
                }, this.maxPopulationWarnTimeout);
            } else {
                //Destory popover if it is currently being displayed.
                if(this.maxPopulatinWarnVisible) {
                    $('#'+elementId+'-popover').popover('destroy');
                }
            }

            if(options.length>0) {
                $('#'+elementId+'-zero').popover('hide');
            }
            this.previousOptionLength = options.length;
            if (options.length === 0) {
                return this.nonSelectedText
                        + '<span class="caret"></span>';
            } else if (options.length == $('option', $(select)).length) {
                return this.allSelectedText
                        + '<span class="caret"></span>';
            } else if (options.length > this.numberDisplayed) {
                return '<span class="badge">' + options.length
                        + '</span> ' + this.nSelectedText
                        + '<span class="caret"></span>';
            } else {
                var selected = '';
                options.each(function() {
                    // var label = $(this).attr('label') :
                    // $(this).html();
                    selected += $(this).val() + '+';
                });

                return selected.substr(0, selected.length - 1)
                        + ' <b class="caret"></b>';
            }
        },
        buttonTitle : function(options, select) {
            if (options.length === 0) {
                return this.nonSelectedText;
            } else {
                var selected = '';
                options.each(function() {
                    selected += $(this).text() + '\n';
                });
                return selected;
            }
        },
        onChange : function(option, checked) {
            /*
            var active_tab = $("#ldlink-tabs li:[class]='active']");
            console.dir(active_tab);
            */
            //alert("You changed the population selection.");
            //console.log("Option: ")
            //console.dir(option[0]);
            //console.log("checked: ")
            //console.dir(checked);
        }
    });

    //console.log(elementId);
    //console.dir($('#' + elementId));


}

function getPopulationCodes(id) {
    var population;
    var totalPopulations;
    population =  $('#'+id).val();
    totalPopulations = countSubPopulations(populations);

    //console.log("Populations (static)");
    //console.log("Populations length: "+totalPopulations);

    //console.dir(populations);
    //console.log("Population selected");
    //console.log("Population length: "+population.length);

    //Check for selection of All
    // If total subPopulations equals number of population then popluation = array("All");
    if(totalPopulations == population.length) {
        population = ["ALL"];
        return population;
    }

    population = replaceSubGroups(population);

    return population;
}

function countSubPopulations(populations) {

    var totalPopulations = 0;
    var subPopulations;

    $.each(populations, function(i, val) {
        totalPopulations += Number(Object.size(val.subPopulations));
    });

    return totalPopulations;
}

function replaceSubGroups(population) {
    var totalGroupPopulations = 0;
    var subPopulationsFound = 0;
    var currentSubPopulations = [];
    //Determine if a group has all subPopulations selected.
    $.each(populations, function(currentGroup, val) {
        totalGroupPopulations = Number(Object.size(val.subPopulations));
        subPopulationsFound = 0;
        currentSubPopulations = [];
        //if there is one miss then abbondon effort
        $.each(val.subPopulations, function(pop, desc) {
            if($.inArray(pop, population) !== -1) {
                subPopulationsFound++;
                currentSubPopulations.push(pop);
                //console.log("pop found: "+pop);
            } else {
                missingPop = true;
                //console.log("pop missing: "+pop);
            }
        });
        if(currentSubPopulations.length == totalGroupPopulations) {
            //Remove populations of Group then add Group acronymn
            $.each(currentSubPopulations, function(key, value) {
                //Find position in array
                population.splice( $.inArray(value, population), 1 );
            });
            population.push(currentGroup);

        }
        //If all are found then
        //totalPopulations += Number(Object.size(val.subPopulations));
    });

    return population;
}

function addValidators() {
     $('#snpclipForm').formValidation({
        framework: 'bootstrap',
        icon: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            price: {
                validators: {
                    notEmpty: {
                        message: 'The price is required'
                    },
                    numeric: {
                        message: 'The price must be a number'
                    }
                }
            },
            amount: {
                validators: {
                    notEmpty: {
                        message: 'The amount is required'
                    },
                    numeric: {
                        message: 'The amount must be a number'
                    }
                }
            },
            color: {
                validators: {
                    notEmpty: {
                        message: 'The color is required'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: 'The size is required'
                    }
                }
            }
        }
    });

}

/* Utilities */

$(document).ready(function() {
    $('#ldhap-file-snp-numbers').keyup(validateTextarea);
    $('#ldmatrix-file-snp-numbers').keyup(validateTextarea);
    $('#ldtrait-file-snp-numbers').keyup(validateTextarea);
    $('#snpchip-file-snp-numbers').keyup(validateTextarea);
    $('#snpclip-file-snp-numbers').keyup(validateTextarea);
    $('#region-gene-base-pair-window').keyup(validateBasePairWindows);
    $('#region-variant-base-pair-window').keyup(validateBasePairWindows);
    $('#region-variant-index').keyup(validateIndex);
    $('#region-region-start-coord').keyup(validateChr);
    $('#region-region-end-coord').keyup(validateChr);
    $('#region-region-index').keyup(validateIndex);
    $('#region-gene-index').keyup(validateIndex);
    $('#region-gene-name').keyup(validateGeneName);

});

function validateGeneName() {
    var errorMsg = "Enter a valid Gene Name";
    var textarea = this;
    // console.log($(textarea).attr('pattern'));
    var pattern = new RegExp('^' + $(textarea).attr('pattern') + '$', "i");
    //Check to see if user selected chr10 thru chr22.
    var currentValue = $(this).val();
    $(this).val(currentValue.toUpperCase());
    var hasError = !currentValue.match(pattern);
    // console.log('hasError:'+hasError);
    $(textarea).toggleClass('error', !!hasError);
    $(textarea).toggleClass('ok', !hasError);
    if (hasError) {
        $(textarea).attr('title', errorMsg);
    } else {
        $(textarea).removeAttr('title');
    }
}

function validateChr() {
    var errorMsg = "chr(1-22 or X or Y):######";
    var textarea = this;
    // console.log($(textarea).attr('pattern'));
    var pattern = new RegExp('^' + $(textarea).attr('pattern') + '$', "i");
    var currentValue = $(this).val();
    var hasError = !currentValue.match(pattern);
    // console.log('hasError:'+hasError);
    $(textarea).toggleClass('error', !!hasError);
    $(textarea).toggleClass('ok', !hasError);
    //textarea.setCustomValidity('Hello');
    if (hasError) {
        $(textarea).attr('title', errorMsg);
    } else {
        $(textarea).removeAttr('title');
    }
}

function validateIndex() {
    var errorMsg = "chr(1-22 or X or Y):###### or rs######";
    var textarea = this;
    // console.log($(textarea).attr('pattern'));
    var pattern = new RegExp('^' + $(textarea).attr('pattern') + '$', "i");
    var currentValue = $(this).val();
    var hasError = !currentValue.match(pattern);
    // console.log('hasError:'+hasError);
    $(textarea).toggleClass('error', !!hasError);
    $(textarea).toggleClass('ok', !hasError);
    //textarea.setCustomValidity('Hello');
    if (hasError) {
        $(textarea).attr('title', errorMsg);
    } else {
        $(textarea).removeAttr('title');
    }
}

function validateBasePairWindows() {
    var errorMsg = "Enter a positive number";
    var textarea = this;
    var pattern = new RegExp('^' + $(textarea).attr('pattern') + '$');
    var currentValue = $(this).val();
    var hasError = !currentValue.match(pattern);
    // console.log('hasError:'+hasError);
    $(textarea).toggleClass('error', !!hasError);
    $(textarea).toggleClass('ok', !hasError);
    if (hasError) {
        $(textarea).attr('title', errorMsg);
    } else {
        $(textarea).removeAttr('title');
    }
}

function validateTextarea() {
    var errorMsg = "Please match the format requested: rs followed by 1 or more digits (ex: rs12345), no spaces permitted - or - chr(0-22, X, Y):##### (ex: chr1:12345)";
    var textarea = this;
    var pattern = new RegExp('^' + $(textarea).attr('pattern') + '$');
    // check each line of text
    $.each($(this).val().split("\n"), function (index, value) {
        // check if the line matches the patterns
        //console.log(value);
        var hasError = !this.match(pattern);
        if(value == "" || value == "\n" || this.length<=2 )
            hasError = false;
        //console.log("hasError: "+hasError);
        if (typeof textarea.setCustomValidity === 'function') {
            textarea.setCustomValidity(hasError ? errorMsg : '');
        } else {
            // Not supported by the browser, fallback to manual error display...
            $(textarea).toggleClass('error', !!hasError);
            $(textarea).toggleClass('ok', !hasError);
            if (hasError) {
                $(textarea).attr('title', errorMsg);
            } else {
                $(textarea).removeAttr('title');
            }
        }
        return !hasError;
    });
}

function toggleChevron(e) {
    $(e.target).prev('.panel-heading').find("i.indicator")
        .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
}

Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr;
}

function parseFile(file, callback) {
    var fileSize   = file.size;
    var chunkSize  = 4 * 1024; // bytes
    var offset     = 0;
    var self       = this; // we need a reference to the current object
    var chunkReaderBlock = null;

    var readEventHandler = function(evt) {
        if (evt.target.error == null) {
            offset += evt.target.result.length;
            callback(evt.target.result); // callback for handling read chunk
            return; //Only call the callback once. return.
        } else {
            // console.log("Read error: " + evt.target.error);
            return;
        }
        if (offset >= fileSize) {
            // console.log("Done reading file");
            return;
        }
        // of to the next chunk
        chunkReaderBlock(offset, chunkSize, file);
    }

    chunkReaderBlock = function(_offset, length, _file) {
        //console.log("Reading a block, offset is "+_offset);
        var r = new FileReader();
        var blob = _file.slice(_offset, length + _offset);
        r.onload = readEventHandler;
        r.readAsText(blob);
    }

    // now let's start the read with the first block
    chunkReaderBlock(offset, chunkSize, file);
}

function supportAjaxUploadWithProgress() {
  return supportFileAPI() && supportAjaxUploadProgressEvents() && supportFormData();

  function supportFileAPI() {
    var fi = document.createElement('INPUT');
    fi.type = 'file';
    return 'files' in fi;
  };

  function supportAjaxUploadProgressEvents() {
    var xhr = new XMLHttpRequest();
    return !! (xhr && ('upload' in xhr) && ('onprogress' in xhr.upload));
  };

  function supportFormData() {
    return !! window.FormData;
  }
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}