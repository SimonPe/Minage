options:
  placeholders:
    timeplayed: &eTemps de jeu: %timeplayed% minutes

on load:
  set {timeplayed} to {} 

on join:
  add 1 to {timeplayed::%player%} 

on quit:
  remove {timeplayed::%player%} from {timeplayed} 
