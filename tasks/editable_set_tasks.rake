namespace :editable_set do
  
  desc "Sync jquery.editable-set.js"
  task :sync do
    system "rsync -ruv vendor/plugins/editable_set/lib/jquery.editable-set.js public/javascripts/"
  end
  
end