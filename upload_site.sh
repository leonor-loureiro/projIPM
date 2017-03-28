#!/bin/sh
rsync -avz -e ssh site/* ist178375@sigma.tecnico.ulisboa.pt:~/web/IPM
echo http://web.tecnico.ulisboa.pt/ist178375/IPM/index.html
