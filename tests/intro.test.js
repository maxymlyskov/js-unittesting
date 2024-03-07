import { it, expect, describe } from 'vitest'
import { max,fizzBuzz } from '../src/intro'

describe('max', () => {
    it('should return the first argument if it is greater', () => {
        expect(max(2, 1)).toBe(2)
    })
    it('should return the second argument if it is greater', () => {
        expect(max(1, 2)).toBe(2)
    })
    it('should return the first argument if arguments are equal', () => {
        expect(max(2, 2)).toBe(2)
    })
})

describe('fizzBuzz', () => {
    it('should return FizzBuzz if n is multiple of 3 and 5', () => {
        expect(fizzBuzz(15)).toBe('FizzBuzz')
    })
    it('should return Fizz if n is multiple of 3', () => {
        expect(fizzBuzz(9)).toBe('Fizz')
    })
    it('should return Buzz if n is multiple of 5', () => {
        expect(fizzBuzz(10)).toBe('Buzz')
    })
    it('should return arg as a string if n is not multiple of 5 or 3', () => {
        expect(fizzBuzz(1)).toBe('1')
    })
})