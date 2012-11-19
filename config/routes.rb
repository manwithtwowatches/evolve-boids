EvolveBoids::Application.routes.draw do

  root to: "Pages#home"

  get "pages/home"

  match "home" => "Pages#home"
end
