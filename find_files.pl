#!/usr/bin/perl
use strict;
use warnings;
use File::Find;

my $output_file = 'file-paths.txt';
open my $fh, '>', $output_file or die "Cannot open $output_file: $!";

# Define directories to exclude
my @exclude_dirs = qw(.git node_modules);

find(\&wanted, './');

sub wanted {
    my $path = $File::Find::name;

    # Skip excluded directories and any hidden directories
    foreach my $exclude_dir (@exclude_dirs) {
        if ($path =~ m{/$exclude_dir} || $path =~ m{/\.[^/]+}) {
            $File::Find::prune = 1;
            return;
        }
    }

    # Print the file path if it's a file
    if (-f $_) {
        print $fh "$path\n";
    }
}

close $fh;
