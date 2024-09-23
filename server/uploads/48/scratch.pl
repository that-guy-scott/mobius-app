#!/usr/bin/perl
use strict;
use warnings;
use Log::Log4perl qw(:easy);

# Initialize Log4perl
Log::Log4perl->easy_init($DEBUG);

# Create a logger
my $logger = get_logger();

# Log messages at different levels
$logger->debug("This is a debug message");
$logger->info("This is an info message");
$logger->warn("This is a warning message");
$logger->error("This is an error message");
$logger->fatal("This is a fatal message");

# Perform some operation
my $result = 42;
$logger->info("The result of the operation is: $result");

print "Script completed.\n";
