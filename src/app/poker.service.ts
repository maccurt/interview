import { Injectable } from '@angular/core';
import { orderBy, uniq } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class PokerService {
  errorBadCard: Error = new Error('card must have value of 1-ACE to 13-ing');
  errorInvalidCommunityCard = Error('Community: invalid card:only 1(ace) 13 (king)');
  errorInvalidPlayerCard = Error('Player: invalid card:only 1(ace) 13 (king)');
  errorToManyCards = Error('to many cards');
  errorPlayerMustHave2Cards = Error('player must have exactly cards');
  errorCommunityCardCountWrong = Error('community card can only have 3 to 5 cards.');

  constructor() { }

  isStraight = (playerCards: number[], communityCards: number[] = []): boolean => {
    return false;
  };

}