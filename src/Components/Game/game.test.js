import React from 'react';
import Game from './game';
import { shallow, mount } from 'enzyme';

it('renders without crashing', () => {
    shallow(<Game />);
});

it('renders game status correctly', () => {
    const wrapper = mount(<Game />);
    const firstPlayer = 
      wrapper.find('div.game-info').children().first().text();
    expect(firstPlayer).toEqual('Next player: X Asc');

    const button = 
      wrapper.find('button.square').first();
    button.simulate('click');
    const secondPlayer = 
      wrapper.find('div.game-info').children().first().text();
      expect(secondPlayer).toEqual('Next player: O Asc');
});

it('determines the winner correctly', () => {
    const wrapper = mount(<Game />);
    const turn1 = wrapper.find('button.square').at(0);
    turn1.simulate('click');
    const turn2 = wrapper.find('button.square').at(1)
    turn2.simulate('click');
    const turn3 = wrapper.find('button.square').at(4)
    turn3.simulate('click');
    const turn4 = wrapper.find('button.square').at(5)
    turn4.simulate('click');
    const turn5 = wrapper.find('button.square').at(8)
    turn5.simulate('click');

    const winner = 
        wrapper.find('div.game-info').children().first().text();
    expect(winner).toEqual('Winner: X Asc')
});

it('determines a draw correctly', () => {
    const wrapper = mount(<Game />);
    const turn1 = wrapper.find('button.square').at(0);
    turn1.simulate('click');
    const turn2 = wrapper.find('button.square').at(1)
    turn2.simulate('click');
    const turn3 = wrapper.find('button.square').at(2)
    turn3.simulate('click');
    const turn4 = wrapper.find('button.square').at(3)
    turn4.simulate('click');
    const turn5 = wrapper.find('button.square').at(5)
    turn5.simulate('click');
    const turn6 = wrapper.find('button.square').at(4)
    turn6.simulate('click');
    const turn7 = wrapper.find('button.square').at(6)
    turn7.simulate('click');
    const turn8 = wrapper.find('button.square').at(8)
    turn8.simulate('click');
    const turn9 = wrapper.find('button.square').at(7)
    turn9.simulate('click');

    const winner = 
        wrapper.find('div.game-info').children().first().text();
    expect(winner).toEqual('It\'s a draw! Asc')
});

it('displays the move history correctly', () => {
    const wrapper = mount(<Game />);
    const history1 = 
        wrapper.find('div.game-info').children().last().text();
    expect(history1).toEqual('Go to game start');
    
    const turn1 = wrapper.find('button.square').at(0);
    turn1.simulate('click');
    const history2 = 
        wrapper.find('div.game-info').children().last().text();
    expect(history2).toEqual('Go to game startGo to move # 1: 0( 0, 0 )');

    const turn2 = wrapper.find('button.square').at(8)
    turn2.simulate('click');
    const history3 = 
        wrapper.find('div.game-info').children().last().text();
    expect(history3).toEqual(
        'Go to game startGo to move # 1: 0( 0, 0 )Go to move # 2: 8( 2, 2 )');
});

it('changes the toggle text to Asc/Desc when clicked', () => {
    const wrapper = mount(<Game />);
    
    const turn = wrapper.find('button.square').at(0);
    turn.simulate('click');

    const wrapper2 = wrapper.find('div.game-info').children();
    const toggle = wrapper2.find('button.toggle');

    expect(toggle.text()).toEqual('Asc');
    toggle.simulate('click');
    expect(toggle.text()).toEqual('Desc');
    toggle.simulate('click');
    expect(toggle.text()).toEqual('Asc');
});

it('sorts moves history in ascending/descending order when button toggled', () => {
    const wrapper = mount(<Game />);
    
    const turn = wrapper.find('button.square').at(0);
    turn.simulate('click');
    let history = 
        wrapper.find('div.game-info').children().last().text();
    expect(history).toEqual('Go to game startGo to move # 1: 0( 0, 0 )');

    const wrapper2 = wrapper.find('div.game-info').children();
    const toggle = wrapper2.find('button.toggle');
    toggle.simulate('click');
    const revHistory = 
        wrapper.find('div.game-info').children().last().text();
    expect(revHistory).toEqual('Go to move # 1: 0( 0, 0 )Go to game start');

    toggle.simulate('click');
    history = 
        wrapper.find('div.game-info').children().last().text();
    expect(history).toEqual('Go to game startGo to move # 1: 0( 0, 0 )');
});

it('does nothing when there\'s a winner already', () => {
    const wrapper = mount(<Game />);
    const turn1 = wrapper.find('button.square').at(0);
    turn1.simulate('click');
    const turn2 = wrapper.find('button.square').at(1)
    turn2.simulate('click');
    const turn3 = wrapper.find('button.square').at(4)
    turn3.simulate('click');
    const turn4 = wrapper.find('button.square').at(5)
    turn4.simulate('click');
    const turn5 = wrapper.find('button.square').at(8)
    turn5.simulate('click');

    // X has won the game
    const historyText = 
    "Go to game startGo to move # 1: 0( 0, 0 )Go to move # 2: 1( 1, 0 )" + 
    "Go to move # 3: 4( 1, 1 )Go to move # 4: 5( 2, 1 )Go to move # 5: 8( 2, 2 )"
    const history = 
        wrapper.find('div.game-info').children().last().text();
    expect(history).toEqual(historyText);

    const turn6 = wrapper.find('button.square').at(7)
    turn6.simulate('click');
    // history is not updated with the new clicked cell
    expect(history).toEqual(historyText); 
});

it('reverses up to move when move clicked', () => {
    jest.spyOn(Game.prototype, 'jumpTo');
    const wrapper = mount(<Game />);
    
    const turn = wrapper.find('button.square').at(0);
    turn.simulate('click');
    const turn1 = wrapper.find('button.square').at(1);
    turn1.simulate('click');
    const turn2 = wrapper.find('button.square').at(2)
    turn2.simulate('click');

    const wrapper2 = wrapper.find('div.game-info').children();
    const moves = wrapper2.find('ol').children().first();
    const first = moves.find('button.jumpTo')
    first.simulate('click');
    expect(Game.prototype.jumpTo).toHaveBeenCalled();
    Game.prototype.jumpTo.mockRestore();
});
