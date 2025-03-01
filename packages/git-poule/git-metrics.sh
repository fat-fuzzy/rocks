#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;96m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Default values
TIME_PERIOD="730 days" # 2 years default
FILE_PATTERN="*.css"   # CSS files default

# Help function
show_help() {
    echo "Usage: $0 [-t time_period] [-f file_pattern]"
    echo
    echo "Options:"
    echo "  -t    Time period (e.g., '30 days', '6 months', '2 years')"
    echo "  -f    File pattern (e.g., '*.css', '*.ts', '*.svelte')"
    echo "  -h    Show this help message"
    echo
    echo "Examples:"
    echo "  $0                          # Uses defaults (2 years, *.css)"
    echo "  $0 -t '6 months' -f '*.ts'  # Analyze TypeScript files for last 6 months"
    echo "  $0 -f '*.svelte'            # Analyze Svelte files for last 2 years"
}

# Parse command line options
while getopts "t:f:h" opt; do
    case $opt in
        t) TIME_PERIOD="$OPTARG";;
        f) FILE_PATTERN="$OPTARG";;
        h) show_help; exit 0;;
        \?) echo "Invalid option -$OPTARG" >&2; show_help; exit 1;;
    esac
done

echo -e "${CYAN}File Analysis for pattern: $FILE_PATTERN${NC}" > logs/git-metrics.log
echo -e "${CYAN}Time period: $TIME_PERIOD${NC}" >> logs/git-metrics.log
echo "===================="

# Count total number of matching files
files_count=$(find . -name "$FILE_PATTERN" | wc -l)
echo -e "${GREEN}Total files matching pattern:${NC} $files_count" >> logs/git-metrics.log

# Count total lines (excluding empty lines and comments)
lines_count=$(find . -name "$FILE_PATTERN" -exec cat {} \; | grep -v '^$' | grep -v '^[[:space:]]*$' | grep -v '^[[:space:]]*\/\*' | grep -v '^[[:space:]]*\*' | grep -v '^[[:space:]]*\/\/' | wc -l)
echo -e "${GREEN}Total lines of code:${NC} $lines_count" >> logs/git-metrics.log

# Get file changes in the specified time period
echo -e "\n${BLUE}Changes (Last $TIME_PERIOD)${NC}" >> logs/git-metrics.log
echo -e "\n${BLUE}Output to logs/git-metrics.log"
echo "=========================="

git log --since="$TIME_PERIOD ago" --pretty=format:"%h - %an, %ar : %s" --follow -- "$FILE_PATTERN" >> logs/git-metrics.log

# Count related commits in the specified time period
commits_count=$(git log --since="$TIME_PERIOD ago" --follow -- "$FILE_PATTERN" | grep -c "commit")
echo -e "\n${GREEN}Total related commits:${NC} $commits_count" >> logs/git-metrics.log

# Show files with most frequent changes
echo -e "\n${BLUE}Most Frequently Changed Files${NC}" >> logs/git-metrics.log
echo -e "\n${BLUE}Output to logs/git-metrics.log"
echo "==============================="
git log --pretty=format: --name-only --follow -- "$FILE_PATTERN" | sort | uniq -c | sort -rn >> logs/git-metrics.log

# Calculate average lines changed per commit
echo -e "\n${BLUE}Change Statistics (Last $TIME_PERIOD)${NC}" >> logs/git-metrics.log
echo -e "\n${BLUE}Output to logs/git-metrics.log"
echo "================================="
git log --since="$TIME_PERIOD ago" --numstat --follow -- "$FILE_PATTERN" | awk 'NF==3 {plus+=$1; minus+=$2} END {printf "Lines added: %d\nLines removed: %d\nNet change: %d\n", plus, minus, plus-minus}' >> logs/git-metrics.log

# Show related fixes/bugs
echo -e "\n${BLUE}Related Fixes/Bugs (Last $TIME_PERIOD)${NC}" >> logs/git-metrics.log
echo -e "\n${BLUE}Output to logs/git-metrics.log"
echo "=================================="
git log --since="$TIME_PERIOD ago" --grep="fix\|bug" --pretty=format:"%h - %an, %ar : %s" --follow -- "$FILE_PATTERN" >> logs/git-metrics.log

# Calculate time between changes
echo -e "\n${BLUE}Development Pace Analysis${NC}" >> logs/git-metrics.log
echo -e "\n${BLUE}Output to logs/git-metrics.log"
echo "========================="
git log --since="$TIME_PERIOD ago" --date=iso --pretty=format:"%ad" --follow -- "$FILE_PATTERN" | sort -r | \
gawk '
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
            printf "Average time between changes: %.2f hours\n", avg/3600;
        }
    }' >> logs/git-metrics.log

# Print summary footer
echo -e "\n${CYAN}Analysis Complete${NC}" >> logs/git-metrics.log
echo -e "\n${BLUE}Output to git-metrics.log"
echo "=================="
echo -e "Pattern: $FILE_PATTERN" >> logs/git-metrics.log
echo -e "Period: $TIME_PERIOD" >> logs/git-metrics.log
echo -e "Total Files: $files_count" >> logs/git-metrics.log
echo -e "Total Commits: $commits_count" >> logs/git-metrics.log
