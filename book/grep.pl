$test=$ARGV[0];
print $test;
while (<STDIN>) {
  if ($_ =~ /$test/) {print $_;}
  }
