class Admin::NewsController < ApplicationController
  before_action :set_news, only: [:show, :edit, :update, :destroy]

  def index
    @admin_news = ::News.all
  end

  def show; end

  def new
    @admin_news = ::News.new
  end

  def edit; end

  def create
    @admin_news = ::News.new(news_params)
    if @admin_news.save
      ActionCable.server.broadcast 'news_channel', @admin_news
      redirect_to admin_news_index_path, notice: 'News was successfully created.'
    else
      render :new
    end
  end

  def update
    if @admin_news.update(news_params)
      ActionCable.server.broadcast 'news_channel', @admin_news
      redirect_to admin_news_index_path, notice: 'News was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @admin_news.destroy
    redirect_to admin_news_index_path, notice: 'News was successfully destroyed.'
  end

  private

  def set_news
    @admin_news = ::News.find(params[:id])
  end

  def news_params
    params.require(:news).permit(:title, :content, :published_at, :hidden, :image)
  end
end
