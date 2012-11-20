EvolveBoids::Application.routes.draw do

  resources :genes, :only => [:index]

  root to: "Pages#home"

  get "pages/home"

  match "home" => "Pages#home"
end
