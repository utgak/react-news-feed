class Admin::ApplicationController < ActionController::Base
  layout 'admin'
  http_basic_authenticate_with name: "admin", password: "admin"
end
