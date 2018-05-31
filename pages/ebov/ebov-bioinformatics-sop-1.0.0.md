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
conda install -y conda install bwa samtools biopython nanopolish porechop pandas
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

### Basecalling with Albacore (MinION on laptop)

Run Albacore on the new run folder:

```
read_fast5_basecaller -c r94_450bps_linear.cfg -i /path/to/reads -s run_name -o fastq -t 4 -r --barcoding
````

You need to substitute `/path/to/reads` to the directory where the FAST5 files from your
run are. Common locations are:

   - Mac: ```/Library/MinKNOW/data/reads/run_name```
   - Linux: ```/var/lib/MinKNOW/data/reads```
   - Windows ```c:/data/reads```

Gather up the FASTQ output from Albacore:

```
artic gather --min-length 400 --max-length 700 --prefix run_name output_directory
```

We use a length filter here of between 400 and 700 to remove obviously chimeric reads.

### Basecalling using MinIT or GridION

If running on MinIT or GridION and you have used Guppy to basecall through Dogfish, instead you can do:

```
artic gather --guppy --min-length 400 --max-length 700 --prefix run_name /data/basecalled/path/to/reads
```

You will now have a file called: ``run_name_all.fastq``
and a file called ``run_name_sequencing_summary.txt``, 
as well as individual files for each barcode (if previously demultiplexed).

### Demultiplex with Porechop with stringent settings

This stage is obligatory, even if you have already demultiplexed with Albacore, due to
significant barcoding misassignments that can confound results:

```
artic demultiplex --threads 4 --prefix run_name_final run_name_all.fastq
```

Now you will have new files called:

```
run_name_final_BC01.fastq
run_name_final_BC02.fastq
run_name_final_BC03.fastq
```

### Create the nanopolish index (once per sequencing run, not per sample)

```
nanopolish index -s run_name_sequencing_summary.txt -d /path/to/reads run_name_all.fastq
```

Again, alter ``/path/to/reads`` to point to the original location of the FAST5 files.

## Run the MinION pipeline

For each barcode you wish to process:

```
artic minion --normalise 200 --threads 4 --scheme-directory primer-schemes --read-file run_name_final_NB01.fastq --nanopolish-read-file run_name_all.fastq ZaireEbola/V2 samplename
```

Replace ``samplename`` as appropriate:

## Output files

   * ``samplename.primertrimmed.bam`` - BAM file for visualisation after primer-binding site trimming
   * ``samplename.vcf`` - detected variants in VCF format
   * ``samplename.variants.tab`` - detected variants
   * ``samplename.consensus.fasta`` - consensus sequence

