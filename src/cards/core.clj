(ns cards.core
  (:require [clojure.string :as str]))


(defn without [value coll]
  (filter #(not= value %) coll))

(defn win-message [{:keys [player1 player2]}]
  (cond
    (= player1 player2) "Tie"
    (> player1 player2) "Player 1 wins"
    (< player1 player2) "Player 2 wins"))

(defn score-message [{:keys [player1 player2]}]
  (str "\n" player1 " V " player2))

(defn end-message [{:keys [player-scores]}]
  (str (score-message player-scores) "\n" (win-message player-scores)))

(defn turn-message [{:keys [turn last-bounty last-player]}]
  (str "Turn: " turn "\nBounty: " last-bounty "\nPlayer1: " (first last-player) "\nPlayer2: " (second last-player) "\n==="))

(defn report [games on-turn on-end]
  (let [states (map on-turn games)]
     (str (str/join "\n" states) (on-end (last games)))))

(defn new-scores [scores [card1 card2]]
  (if (> card1 card2)
    (update scores :player1 inc)
    (update scores :player2 inc)))

(defn next-state [{:keys [turn bounty-cards player1 player2 player-scores]}]
  (let [card-bounty (rand-nth bounty-cards)
        card1 (rand-nth player1)
        card2 (rand-nth player2)]
    {:turn (inc turn)
     :last-bounty card-bounty
     :last-player [card1 card2]
     :bounty-cards (without card-bounty bounty-cards)
     :player1 (without card1 player1)
     :player2 (without card2 player2)
     :player-scores (new-scores player-scores [card1 card2])}))

(defn game-loop [states]
  (let [current (last states)]
    (if (empty? (:bounty-cards current))
      states
      (game-loop (conj states (next-state current))))))

(defn run-game []
  (let [state [{:turn 0
                :bounty-cards [1 2 3 4 5 6 7 8]
                :player1 [1 2 3 4 5 6 7 8]
                :player2 [1 2 3 4 5 6 7 8]
                :player-scores {:player1 0
                                :player2 0}}]]
    (game-loop state)))

(print (report (run-game) turn-message end-message))

;;(print "\n")

;;(print (+ 1 2))

;;(print "\n-----\n")

(defn -main [& args]
  (println "Working!"))
;;  (print (report (run-game) turn-message end-message)))
