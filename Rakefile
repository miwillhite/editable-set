require 'rake'
require 'yui/compressor'

namespace :editable_set do

  desc "Compress Javascript"
  task :compress do
    compressor = YUI::JavaScriptCompressor.new(:munge => true)

    uncompressed_file = File.read("#{File.dirname(__FILE__)}/lib/jquery.editable-set.js")
    
    compressed_file = File.new("#{File.dirname(__FILE__)}/lib/jquery.editable-set.min.js", "w+")
    compressed_file.puts compressor.compress(uncompressed_file)
    compressed_file.close
  end
  
end