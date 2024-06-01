class Api::V1::NewsController < ApplicationController
  def index
    @news = News.where(hidden: false).order(published_at: :desc)
    render json: @news
  end

  def show
    @news = News.find(params[:id])
    render json: @news
  end
end
