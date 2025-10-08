#!/bin/bash

# Project Export Script
# Dumps project files to a text file for refactoring purposes
# Excludes unnecessary files like node_modules, .git, cache files, etc.

OUTPUT_FILE="project-dump-$(date +%Y%m%d-%H%M%S).txt"

echo "🚀 Starting project export..."
echo "📁 Output file: $OUTPUT_FILE"
echo "⏰ Started at: $(date)"
echo ""

# Function to add file content with header
add_file() {
    local file="$1"
    local relative_path="${file#$PWD/}"

    echo "==================================================================" >> "$OUTPUT_FILE"
    echo "FILE: $relative_path" >> "$OUTPUT_FILE"
    echo "==================================================================" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"

    # Check if file exists and is readable
    if [[ -f "$file" ]] && [[ -r "$file" ]]; then
        cat "$file" >> "$OUTPUT_FILE" 2>/dev/null || echo "[ERROR: Could not read file]" >> "$OUTPUT_FILE"
    else
        echo "[ERROR: File not found or not readable]" >> "$OUTPUT_FILE"
    fi

    echo "" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
}

# Create output file
> "$OUTPUT_FILE"

echo "📋 PROJECT STRUCTURE OVERVIEW" >> "$OUTPUT_FILE"
echo "==============================" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Add project metadata
echo "Project: See Life Baptist Church" >> "$OUTPUT_FILE"
echo "Export Date: $(date)" >> "$OUTPUT_FILE"
echo "Project Root: $(pwd)" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Find and add important configuration files first
echo "📋 Adding configuration files..." >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

config_files=(
    "package.json"
    "tsconfig.json"
    "next.config.ts"
    "postcss.config.mjs"
    "eslint.config.mjs"
    "components.json"
    "README.md"
    "prisma/schema.prisma"
)

for file in "${config_files[@]}"; do
    if [[ -f "$file" ]]; then
        echo "Adding: $file"
        add_file "$file"
    fi
done

echo "" >> "$OUTPUT_FILE"
echo "📋 Adding source code files..." >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Find all source files (excluding node_modules, .git, and other unnecessary folders)
find . -type f \( \
    -name "*.tsx" -o \
    -name "*.ts" -o \
    -name "*.jsx" -o \
    -name "*.js" -o \
    -name "*.css" -o \
    -name "*.scss" -o \
    -name "*.json" -o \
    -name "*.md" \
\) \
! -path "./node_modules/*" \
! -path "./.git/*" \
! -path "./.next/*" \
! -path "./dist/*" \
! -path "./build/*" \
! -path "./coverage/*" \
! -path "./src/generated/*" \
! -path "./package-lock.json" \
! -path "./yarn.lock" \
! -path "./pnpm-lock.yaml" \
! -path "*.log" \
! -path "./export-project-files.sh" \
| while read -r file; do
    echo "Adding: $file"
    add_file "$file"
done

echo "" >> "$OUTPUT_FILE"
echo "✅ Export completed!" >> "$OUTPUT_FILE"
echo "📊 Final file size: $(du -h "$OUTPUT_FILE" | cut -f1)" >> "$OUTPUT_FILE"
echo "📝 Total files processed: $(grep -c "FILE:" "$OUTPUT_FILE")" >> "$OUTPUT_FILE"
echo "⏰ Completed at: $(date)" >> "$OUTPUT_FILE"

echo ""
echo "✅ Project export completed successfully!"
echo "📁 Output file: $OUTPUT_FILE"
echo "📊 Size: $(du -h "$OUTPUT_FILE" | cut -f1)"
echo "📋 Files included: $(grep -c "FILE:" "$OUTPUT_FILE")"

echo ""
echo "📋 EXCLUDED FILES/FOLDERS:"
echo "  • node_modules/ (dependency folders)"
echo "  • .git/ (git repository data)"
echo "  • .next/ (Next.js build cache)"
echo "  • src/generated/ (generated code)"
echo "  • *.log (log files)"
echo "  • package-lock.json (redundant with package.json)"
echo "  • Binary files and images"
echo ""
echo "💡 The exported file contains only source code and configuration"
echo "   files necessary for project refactoring and analysis."