class Api::V1::NewsController < ApplicationController
  def index
    @news = News.where(hidden: false).order(published_at: :desc)
    render json: @news
  end

  def show
    @news = News.find(params[:id])
    render json: @news
  end

  # def create
  #   @news = News.new(news_params)
  #   if @news.save
  #     ActionCable.server.broadcast 'news_channel', @news
  #     render json: @news, status: :created
  #   else
  #     render json: @news.errors, status: :unprocessable_entity
  #   end
  # end

  # def update
  #   @news = News.find(params[:id])
  #   if @news.update(news_params)
  #     ActionCable.server.broadcast 'news_channel', @news
  #     render json: @news
  #   else
  #     render json: @news.errors, status: :unprocessable_entity
  #   end
  # end

  # def hide
  #   if @news.update(visible: false)
  #     ActionCable.server.broadcast 'news_channel', @news
  #     render json: @news
  #   else
  #     render json: @news.errors, status: :unprocessable_entity
  #   end
  # end

  # private

  # def news_params
  #   params.require(:news).permit(:title, :content, :published_at, :hidden, :image)
  # end
end
