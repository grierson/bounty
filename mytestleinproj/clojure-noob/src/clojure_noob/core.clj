; jdk and clojure
; ===============

; https://clojure.org/guides/getting_started#_clojure_installer_and_cli_tools

; brew cask install adoptopenjdk
; brew install clojure 

; lein
; ====
; https://www.hildeberto.com/2015/07/installing-leiningen-on-mac-os.html
; but need to run 
; export PATH=$PATH:/Applications/clojure
; as ~/.bash_profle not work, is it the mac z shell thing???

; https://www.braveclojure.com/getting-started/

; you have to be in a directory with project.clj

; trying the real one 
; https://github.com/kwccoin/bounty
; got error after saying 4x4


(ns clojure-noob.core
  (:gen-class))

(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (println "Hello, World!")
  (println "I am a teapot"))
