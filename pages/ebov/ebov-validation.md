---
title: Ebola virus Nanopore validation results
keywords: ebov
last_updated: May 24, 2018
tags: [ebov]
sidebar: artic_sidebar
permalink: ebov/ebov-validation.html
toc: false
folder: ebov
---

## Background

The ongoing outbreak of Ebola virus in the Democratic Republic of Congo has highlighted
the need for rapid sequencing ability to help with source attribution and aid epidemiological
investigations (including environmental reservoirs).

During real-time sequence surveillance of Ebola in Guinea and Sierra Leone in 2015-2016
we employed a PCR amplicon schemes specifically targeting the Makona strain of Ebola. 
Because this scheme was designed against Makona, we expect that this scheme may not be
optimal due to sequence diversity.

Therefore we devised a new scheme using all available Ebola virus sequences and then
sequenced Zaire Ebolavirus RNAs at Public Health England, Porton Down. We selected viruses
from three separate outbreaks in order to gain confidence in the scheme's ability to sequence
divergent lineages.

This validation acted as a test of our recently published standard operating procedure.

## Primer pairs

30 minute run:

![Coverage by primer pair](/images/ebov-validation/coverage.png)

## Results

Consensus sequences for 30 minute run:

[/artic/ebov-consensus-30m.fasta](https://artic.s3.climb.ac.uk/ebov-consensus-30m.fasta)

## Data availability

Data hosting provided by MRC CLIMB.

30 minute bulk file:

[artic/bulkfiles/nick_W54_55SU1_SUW_20180523_FAH83694_MN21030_sequencing_run_ZEBOV_3samples_NB_87702.fast5](https://artic.s3.climb.ac.uk/bulkfiles/nick_W54_55SU1_SUW_20180523_FAH83694_MN21030_sequencing_run_ZEBOV_3samples_NB_87702.fast5) [4.1Gb]

2 hour bulk file:

[artic/bulkfiles/nick_W54_55SU1_SUW_20180523_FAH83694_MN21030_sequencing_run_ZEBOV_3Samples_NB_58439.fast5](https://artic.s3.climb.ac.uk/bulkfiles/nick_W54_55SU1_SUW_20180523_FAH83694_MN21030_sequencing_run_ZEBOV_3Samples_NB_58439.fast5) [20.5Gb]


{% include icon-callout.html
type='default'
file='wellcome-logo-red-small.png'
url='http://wellcome.ac.uk'
width='17%'
title='Funded by the Wellcome Trust'
subtitle='Collaborators Award 206298/Z/17/Z --- <a href="artic.network">ARTIC network</a>'
%}

{% include links.html %}
