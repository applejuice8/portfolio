#!/bin/sh

green=$(tput setaf 2)   # Green
red=$(tput setaf 1)     # Red
reset=$(tput sgr0)

msg="$*"

if [ -z "$msg" ]; then
    echo "${red}Usage: ./fast_commit.bash 'commit message'${reset}"
    exit 1
fi

echo
echo "${green}Executing 'git add .'${reset}"
git add .

echo
echo "${green}Executing 'git commit -m \"$msg\"'${reset}"
git commit -m "$msg"

echo
echo "${green}Executing 'git push'${reset}"
git push
