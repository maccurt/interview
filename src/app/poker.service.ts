import { Injectable } from '@angular/core';
import { orderBy, uniq } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class PokerService {
  // toManyCardError: Error = new Error('to many cards: only seven hards allowed!');
  errorBadCard: Error = new Error('card must have value of 1-ACE to 13-ing');
  errorInvalidCommunityCard = Error('Community: invalid card:only 1(ace) 13 (king)');
  errorInvalidPlayerCard = Error('Player: invalid card:only 1(ace) 13 (king)');
  errorToManyCards = Error('to many cards');
  errorPlayerMustHave2Cards = Error('player must have exactly cards');
  errorCommunityCardCountWrong = Error('community card can only have 3 to 5 cards.');

  constructor() {
  }

  isStraight = (playerCards: number[], communityCards: number[] = []): boolean => {

    //check player cards
    if (playerCards.length !== 2) { throw this.errorPlayerMustHave2Cards; }
    if (this.areCardValuesInvalid(playerCards)) { throw this.errorInvalidPlayerCard; }

    //check community cards
    this.throwErrorCommunityCardCountWrong(communityCards);

    //check community cards for invalid values
    this.throwErrorInvalidCommunityCard(communityCards);

    const uniqueSortedCards = uniq(orderBy([...playerCards, ...communityCards]));
    if (uniqueSortedCards.length < 5) { return false; }

    //if there is an ACE(1) add it to the end as a ACE(14)
    if (uniqueSortedCards[0] === 1) { uniqueSortedCards.push(14); }

    let connectedCardCount = 0;
    //loop through the card and determine if they are connected    
    for (let i = 0; i < uniqueSortedCards.length - 1; i++) {
      const diff = Math.abs(uniqueSortedCards[i] - uniqueSortedCards[i + 1]);
      diff === 1 ? connectedCardCount++ : connectedCardCount = 0;
      if (connectedCardCount === 4) {
        console.log(connectedCardCount);
        break;
      }
    }
    return (connectedCardCount === 4);
  };


  private areCardValuesInvalid = (combinedCards: number[]): boolean => {
    const indexOfFirstBadCard = combinedCards.findIndex((v) => {
      return v < 1 || v > 13;
    });
    return (indexOfFirstBadCard >= 0);
  };

  private throwErrorCommunityCardCountWrong = (cardValueList: number[]) => {
    if (cardValueList.length < 3 || cardValueList.length > 5) {
      throw this.errorCommunityCardCountWrong;
    }
  };

  private throwErrorInvalidCommunityCard = (cardValues: number[]) => {
    if (this.areCardValuesInvalid(cardValues)) { throw this.errorInvalidCommunityCard; }
  };

}