---
title: "ARTIC-EBOV-bioinformaticsSOP-v1.0.0 | Ebola virus Nanopore sequencing protocol | amplicon, native barcoding"
keywords: protocol
layout: document
last_updated: May 18, 2018
tags: [protocol]
summary:
permalink: ebov/ebov-bioinformatics-sop-1.0.0.html
folder: ebov
title_text: "Ebola virus bioinformatics protocol"
subtitle_text: "Nanopore | bioinformatics"
document_name: "ARTIC-EBOV-bioinformaticsSOP-v1.0.0"
creation_date: 2018-05-26
revision_date: 
forked_from: 
author: Nick Loman
citation: "Loman *et al.* In Prep."
---

{% include callout.html
type='default'
content='**Overview:** '
%}

<br />

This document is part of the Ebola virus Nanopore sequencing protocol package:
: [http://artic.network/ebov/](http://artic.network/ebov/)

<br /><br /><br />

{% include wellcome-trust.html %}

<div class="pagebreak"> </div>

## Preparation

Set up the computing environment as described here in this document: [ebov-it-setup-1.0.0](ebov-it-setup-1.0.0.html)

### Installing software

Activate the ARTIC environment:

```
source activate artic
```

Install the bioinformatics packages required:

```
conda install -y conda install bwa samtools biopython nanopolish porechop
```

Install the Artic pipeline:

```
git clone https://github.com/artic-network/fieldbioinformatics.git
python fieldbioinformatics/setup.py install
export PATH=$PATH:`pwd`/fieldbioinformatics/artic
```

Install the Artic primer schemes:

```
git clone https://github.com/artic-network/primer-schemes.git
```

<div class="pagebreak"> </div>
## Nanopore Bioinformatics

### Basecalling with Albacore

Run Albacore on the new run folder:

```
read_fast5_basecaller -c r94_450bps_linear.cfg -i /path/to/reads -s run_name -o fastq -t 4 -r --barcoding
````

You need to substitute `/path/to/reads` to the directory where the FAST5 files from your
run are. Common locations are:

Mac: ```/Library/MinKNOW/data/reads/run_name```
Linux: ```/var/lib/MinKNOW/data/reads```
Windows ```/c/data/reads```

### Consensus sequence generation

Gather up the FASTQ output from Albacore:

```
artic gather --min-length 400 --max-length 700 output_directory
```

You will now have a number of files labeled:

```
run_name_barcode01.fastq
run_name_barcode02.fastq
..
```

### Create the nanopolish index (once per sequencing run, not per sample)

```
nanopolish index -s run_name/sequencing_summary.txt -d /path/to/reads run_name_all.fastq
```

## Run the MinION pipeline

For each barcode you wish to process:

```
artic minion --normalise 200 --threads 4 --scheme-directory primer-schemes --read-file run_name_barcode01.fastq --nanopolish-read-file run_name_all.fastq ZaireEbola/V2 barcode01_samplename
```

