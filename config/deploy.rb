set :application, 'nodechat'
set :repo_url, 'git@github.com:dannysun2/node-chat-app.git'

set :deploy_to, "/home/deploy/apps/#{fetch(:application)}"
set :keep_releases,   5

set :ssh_options, {
    forward_agent: true,
    port: 22
}
namespace :deploy do

  desc 'Restart application'
  task :restart do
    invoke 'pm2:restart'
  end

  after :publishing, :restart
end
