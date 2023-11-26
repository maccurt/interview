import { TestBed } from '@angular/core/testing';
import { PokerService } from './poker.service';

describe('isStraight', () => {
    let service: PokerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PokerService);
    });

    describe('check all error s', () => {

        describe('playerMustHave2Cards: a player must have 2 cards in their hand', () => {

            it('no player cards should throw an error', () => {
                expect(() => {
                    service.isStraight([]);
                }).toThrowError(service.errorPlayerMustHave2Cards.message);
            });

            it('one player cards should throw an error', () => {
                expect(() => {
                    service.isStraight([2]);
                }).toThrowError(service.errorPlayerMustHave2Cards.message);
            });

            it('three player cards should throw an error', () => {
                expect(() => {
                    service.isStraight([2, 3, 4]);
                }).toThrowError(service.errorPlayerMustHave2Cards.message);
            });

            it('2 VALID player cards should NOT throw an error', () => {
                expect(() => {
                    service.isStraight([2, 4]);
                }).not.toThrowError(service.errorPlayerMustHave2Cards.message);
            });
        });

        describe('errorInvalidPlayerCard: card values can only be 1 to 13', () => {

            it('[14,1] (NOT A ACE) is an invalid player card and should throw and error', () => {
                expect(() => {
                    service.isStraight([14, 1], [1, 2, 3, 4, 5]);
                }).toThrowError(service.errorInvalidPlayerCard.message);
            });

            it('[1,14] (NOT A ACE) is an invalid player card and should throw and error', () => {
                expect(() => {
                    service.isStraight([1, 14], [1, 2, 3, 4, 5]);
                }).toThrowError(service.errorInvalidPlayerCard.message);
            });

            it('0 value is an invalid player card and should throw and error', () => {
                expect(() => {
                    service.isStraight([1, 0], [1, 2, 3, 4, 5]);
                }).toThrowError(service.errorInvalidPlayerCard.message);
            });
        });

        describe('errorInvalidCommunityCard: card values can only be 1 to 13', () => {

            it('player cards [1, 2], community [1, 2, 14] should throw an error', () => {
                expect(() => {
                    service.isStraight([1, 2], [1, 2, 14]);
                }).toThrowError(service.errorInvalidCommunityCard.message);
            });

            it('player cards [1, 2], community [14, 2, 1] should throw an error', () => {
                expect(() => {
                    service.isStraight([1, 2], [14, 2, 1]);
                }).toThrowError(service.errorInvalidCommunityCard.message);
            });

            it('player cards [1, 2], community [0, 2, 1] should throw an error', () => {
                expect(() => {
                    service.isStraight([1, 2], [0, 2, 1]);
                }).toThrowError(service.errorInvalidCommunityCard.message);
            });
        });

        describe('errorCommunityCardCountWrong', () => {

            it('six community cards should throw an error', () => {
                expect(() => {
                    service.isStraight([2, 3], [1, 2, 3, 4, 5, 6]);
                }).toThrowError(service.errorCommunityCardCountWrong.message);
            });

            it('zero or no community cards should throw an error', () => {
                expect(() => {
                    service.isStraight([2, 3], []);
                }).toThrowError(service.errorCommunityCardCountWrong.message);
            });

            it('1 community cards should throw an error', () => {
                expect(() => {
                    service.isStraight([2, 3], [3]);
                }).toThrowError(service.errorCommunityCardCountWrong.message);
            });

            it('2 community cards should throw an error', () => {
                expect(() => {
                    service.isStraight([2, 3], [2, 3]);
                }).toThrowError(service.errorCommunityCardCountWrong.message);
            });

        });
    });

    describe('all valid cards and valid combinations no errors', () => {

        describe('should return false', () => {
            it('false', () => {
                expect(service.isStraight([3, 3], [3, 3, 4, 5, 6])).toBe(false);
                expect(service.isStraight([1, 1], [6, 8, 10, 12,])).toBe(false);
                expect(service.isStraight([1, 2], [3, 4, 9, 12,])).toBe(false);
                expect(service.isStraight([10, 9], [8, 7, 1, 12,])).toBe(false);
            });
        });

        describe('should return true', () => {

            it('ascending order', () => {
                expect(service.isStraight([1, 2], [3, 4, 5])).toBe(true);
                expect(service.isStraight([2, 3], [4, 5, 6])).toBe(true);
                expect(service.isStraight([6, 7], [8, 9, 10])).toBe(true);
                expect(service.isStraight([9, 10], [11, 12, 13])).toBe(true);
            });

            it('descending order', () => {
                expect(service.isStraight([5, 4], [3, 2, 1])).toBe(true);
                expect(service.isStraight([6, 5], [4, 3, 2])).toBe(true);
                expect(service.isStraight([10, 9], [8, 7, 6, 2, 2])).toBe(true);
                expect(service.isStraight([9, 10], [11, 12, 13])).toBe(true);
            });

            it('mixed up', () => {
                expect(service.isStraight([4, 5], [1, 3, 2, 3])).toBe(true);
                expect(service.isStraight([6, 5], [4, 7, 2, 3])).toBe(true);
                expect(service.isStraight([10, 9], [7, 8, 6, 2, 2])).toBe(true);
                expect(service.isStraight([9, 10], [11, 1, 1, 12, 13])).toBe(true);
            });

            it('ace high straight', () => {
                //remember an ace is a 1 but can be high after king
                expect(service.isStraight([13, 12], [11, 10, 1, 8])).toBe(true);
                expect(service.isStraight([1, 12], [11, 10, 13, 8])).toBe(true);
            });
        });
    });
});