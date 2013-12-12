Me::Application.routes.draw do
  resources :photos do 
    collection do 
      get 'home'
    end
  end

  root :to => 'photos#home'
  resources :users
  resources :user_sessions, :only => [:create]
  match '/signin' => 'user_sessions#new'
  match '/signout' => 'user_sessions#destroy' 
end
