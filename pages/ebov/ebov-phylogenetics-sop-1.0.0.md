---
title: "ARTIC-EBOV-phylogeneticsSOP-v1.0.0 | Ebola virus real-time phylogenetics"
keywords: protocol
layout: document
last_updated: May 18, 2018
tags: [protocol]
summary:
permalink: ebov/ebov-phylogenetics-sop-1.0.0.html
folder: ebov
title_text: "Ebola virus bioinformatics protocol"
subtitle_text: "Nanopore | bioinformatics"
document_name: "ARTIC-EBOV-phylogeneticsSOP-v1.0.0"
creation_date: 2018-05-26
forked_from: 
author: Andrew Rambaut, Philippe Lemey
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

Activate the ARTIC Conda environment:

```
source activate artic
```

Install the phylogenetics packages required:

```
conda install mafft phyml  
```

<div class="pagebreak"> </div>
## Phylogenetic analysis

