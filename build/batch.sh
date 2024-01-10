#!/bin/bash

# Get the command and its arguments from the command line
command=$1
args=${@:2}

# Initialize an empty string to hold the processed arguments
new_args=""

# Loop over each argument
for arg in $args
do
    echo "Processing argument: [$arg]"
    # Remove the base path from the current argument
    arg=${arg#"docs/en/"}

    # Add the processed argument to the new arguments string
    new_args="$new_args $arg"
done

# Replace the old arguments string with the new one
args=$new_args

# Iterate over the subdirectories in the i18n directory
for sub_dir in docs/*/
do
    # Check if the subdirectory is a directory
    # exclude certain subdirectories
    if [ -d "$sub_dir" ] && [ "$sub_dir" != "docs/.vitepress/" ] && [ "$sub_dir" != "docs/attachments/" ] && [ "$sub_dir" != "docs/public/" ]
    then
        # Extract the subdirectory name
        sub_dir_name=$(basename "$sub_dir")

        # Print the name of the subdirectory being processed
        echo "Processing $sub_dir_name..."

        # Change to the subdirectory
        cd "$sub_dir"

        echo "Executing command: $command $args"

        # Execute the command with the provided arguments
        $command $args

        # Change back to the original directory
        cd -
    fi
done
