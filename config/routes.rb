Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :users do
  	resources :transactions do
  	end
  	get :settings
  	get :support
  end

  root "users#index"
end
