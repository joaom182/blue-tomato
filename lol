 !    Heroku client internal error.
 !    Search for help at: https://help.heroku.com
 !    Or report a bug at: https://github.com/heroku/heroku/issues/new

    Error:       read timeout reached (Excon::Errors::Timeout)
    Backtrace:   c:/Program Files (x86)/Heroku/vendor/gems/excon-0.39.5/lib/excon/socket.rb:84:in `rescue in read'
                 c:/Program Files (x86)/Heroku/vendor/gems/excon-0.39.5/lib/excon/socket.rb:79:in `read'
                 c:/Program Files (x86)/Heroku/vendor/gems/excon-0.39.5/lib/excon/response.rb:122:in `parse'
                 c:/Program Files (x86)/Heroku/vendor/gems/excon-0.39.5/lib/excon/middlewares/response_parser.rb:6:in `response_call'
                 c:/Program Files (x86)/Heroku/vendor/gems/excon-0.39.5/lib/excon/connection.rb:363:in `response'
                 c:/Program Files (x86)/Heroku/vendor/gems/excon-0.39.5/lib/excon/connection.rb:233:in `request'
                 c:/Program Files (x86)/Heroku/vendor/gems/excon-0.39.5/lib/excon.rb:226:in `get'
                 c:/Program Files (x86)/Heroku/lib/heroku/excon.rb:4:in `get_with_redirect'
                 c:/Program Files (x86)/Heroku/lib/heroku/excon.rb:6:in `get_with_redirect'
                 c:/Program Files (x86)/Heroku/lib/heroku/updater.rb:35:in `http_get'
                 c:/Program Files (x86)/Heroku/lib/heroku/updater.rb:129:in `block in download_file'
                 c:/Program Files (x86)/Heroku/lib/heroku/updater.rb:128:in `open'
                 c:/Program Files (x86)/Heroku/lib/heroku/updater.rb:128:in `download_file'
                 c:/Program Files (x86)/Heroku/lib/heroku/updater.rb:104:in `block (2 levels) in update'
                 C:/Program Files (x86)/Heroku/ruby-1.9.3/lib/ruby/1.9.1/tmpdir.rb:83:in `mktmpdir'
                 c:/Program Files (x86)/Heroku/lib/heroku/updater.rb:96:in `block in update'
                 c:/Program Files (x86)/Heroku/lib/heroku/updater.rb:83:in `wait_for_lock'
                 c:/Program Files (x86)/Heroku/lib/heroku/updater.rb:89:in `update'
                 c:/Program Files (x86)/Heroku/lib/heroku/command/update.rb:39:in `block in update_from_url'
                 c:/Program Files (x86)/Heroku/lib/heroku/helpers.rb:227:in `action'
                 c:/Program Files (x86)/Heroku/lib/heroku/command/update.rb:38:in `update_from_url'
                 c:/Program Files (x86)/Heroku/lib/heroku/command/update.rb:19:in `index'
                 c:/Program Files (x86)/Heroku/lib/heroku/command.rb:217:in `run'
                 c:/Program Files (x86)/Heroku/lib/heroku/cli.rb:33:in `start'
                 c:/Program Files (x86)/Heroku/bin/heroku:29:in `<main>'

    Command:     heroku update
    Version:     heroku/toolbelt/3.10.6 (i386-mingw32) ruby/1.9.3

