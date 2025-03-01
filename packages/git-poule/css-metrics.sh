#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}CSS Files Analysis${NC}"
echo "===================="

# Count total number of CSS files
css_files=$(find . -name "*.css" | wc -l)
echo -e "${GREEN}Total CSS files:${NC} $css_files"

# Count total lines of CSS (excluding empty lines and comments)
css_lines=$(find . -name "*.css" -exec cat {} \; | grep -v '^$' | grep -v '^[[:space:]]*$' | grep -v '^[[:space:]]*/\*' | grep -v '^[[:space:]]*\*' | wc -l)
echo -e "${GREEN}Total lines of CSS:${NC} $css_lines"

# Get CSS file changes in the last 30 days
echo -e "\n${BLUE}CSS Changes (Last 30 days)${NC}"
echo "=========================="
git log --since="30 days ago" --pretty=format:"%h - %an, %ar : %s" --follow -- "*.css"

# Count CSS-related commits in the last 30 days
css_commits=$(git log --since="30 days ago" --follow -- "*.css" | grep -c "commit")
echo -e "\n${GREEN}Total CSS-related commits (30 days):${NC} $css_commits"

# Show files with most frequent CSS changes
echo -e "\n${BLUE}Most Frequently Changed CSS Files${NC}"
echo "==============================="
git log --pretty=format: --name-only --follow -- "*.css" | sort | uniq -c | sort -rn | head -n 10

# Calculate average lines changed per CSS commit
echo -e "\n${BLUE}CSS Change Statistics (Last 30 days)${NC}"
echo "================================="
git log --since="30 days ago" --numstat --follow -- "*.css" | gawk 'NF==3 {plus+=$1; minus+=$2} END {printf "Lines added: %d\nLines removed: %d\nNet change: %d\n", plus, minus, plus-minus}'

# Show CSS-related issues (assuming conventional commit messages with "fix:" or "bug:")
echo -e "\n${BLUE}CSS-Related Fixes/Bugs (Last 30 days)${NC}"
echo "=================================="
git log --since="30 days ago" --grep="fix\|bug" --pretty=format:"%h - %an, %ar : %s" --follow -- "*.css"

# Calculate time between CSS changes (rough estimate of development pace)
echo -e "\n${BLUE}Development Pace Analysis${NC}"
echo "========================="
git log --date=iso --pretty=format:"%ad" --follow -- "*.css" | sort -r | head -n 10 | gawk '
    { 
        current=mktime(substr($0,1,4)" "substr($0,6,2)" "substr($0,9,2)" "substr($0,12,2)" "substr($0,15,2)" "substr($0,18,2));
        if (last) {
            diff = last - current;
            sum += diff;
            count++;
        }
        last = current;
    }
    END {
        if (count > 0) {
            avg = sum/count;
            printf "Average time between CSS changes: %.2f hours\n", avg/3600;
        }
    }'
