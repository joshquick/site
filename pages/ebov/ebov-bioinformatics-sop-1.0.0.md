---
title: "ARTIC-EBOV-seqSOP-v1.0.0 | Ebola virus Nanopore sequencing protocol | amplicon, native barcoding"
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
forked_from: doi:10.1038/nprot.2017.066
author: Nick Loman
citation: "Loman *et al.* In Prep."
---

{% include callout.html
type='default'
content='**Overview:** The following protocol is adapted from the methods of [Quick et al. (2017) *Nature Protocols* **12:** 1261–1276 doi:10.1038/nprot.2017.066](http://doi.org/10.1038/nprot.2017.066) and covers primers, amplicon preparation and clean-up, then uses a single-tube protocol to barcode and adaptor ligate the library, before running minION.'
%}

<br />

Ebola primer scheme:
: [https://github.com/artic-network/primer-schemes/tree/master/ZaireEbola/V2](https://github.com/artic-network/primer-schemes/tree/master/ZaireEbola/V2) 

Ebola virus Nanopore sequencing protocol:
: [http://artic.network/ebov/ebov-seq-sop-1.0.0.html](http://artic.network/ebov/ebov-seq-sop-1.0.0.html)

Ebola virus Nanopore sequencing kit-list:
: [http://artic.network/ebov/ebov-seq-kit-1.0.0.html](http://artic.network/ebov/ebov-seq-kit-1.0.0.html)

<br /><br /><br />

{% include wellcome-trust.html %}

<div class="pagebreak"> </div>

## Preparation

#### Equipment required:


## Software Setup

### Conda

Software will be installed using [Conda](https://conda.io/) -- a cross-platform package and dependency installer.
 
For Conda installation instructions for your operating system go to: [https://conda.io/docs/user-guide/install/](https://conda.io/docs/user-guide/install/). We suggest installing the `Miniconda` version which is relatively small and quick to install.

First use the following commands to set up access to [BioConda](https://bioconda.github.io) (a repository of over 3000 bioinformatics packages):

```
conda config --add channels conda-forge
conda config --add channels bioconda
```

Create an custom environment for running software and install the packages:
  
```
conda create -n artic
```

Although not strictly necessary this will prevent any conflicts with other similar software installed and can be readily removed. You can use this command to activate the environment: 

```
source activate artic
```

and then deactivate it again using this:

```
source deactivate
```

### Installing software

Activate the ARTIC environment:

```
source activate artic
```

Install the bioinformatics packages required:

```
conda install [list of software packages]  
```

Install the phylogenetics packages required:

```
conda install mafft phyml  
```

<div class="pagebreak"> </div>
## Nanopore Bioinformatics

<div class="pagebreak"> </div>
## Phylogenetic analysis





### Part 1
