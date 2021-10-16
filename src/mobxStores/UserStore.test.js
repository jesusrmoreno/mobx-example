const rewire = require("rewire")
const UserStore = rewire("./UserStore")
const prefix = UserStore.__get__("prefix")
// @ponicode
describe("prefix", () => {
    test("0", () => {
        let callFunction = () => {
            prefix("remove")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            prefix("discard")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            prefix("SHUTDOWN")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            prefix("DELETE")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            prefix({ type: "ADD_TODO" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            prefix(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("isLiked", () => {
    let inst

    beforeEach(() => {
        inst = new UserStore.UserStore()
    })

    test("0", () => {
        let callFunction = () => {
            inst.isLiked("a1969970175")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.isLiked(56784)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.isLiked("bc23a9d531064583ace8f67dad60f6bb")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.isLiked(12)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.isLiked(987650)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.isLiked(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("isDisliked", () => {
    let inst

    beforeEach(() => {
        inst = new UserStore.UserStore()
    })

    test("0", () => {
        let callFunction = () => {
            inst.isDisliked(12345)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.isDisliked("bc23a9d531064583ace8f67dad60f6bb")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.isDisliked(56784)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.isDisliked("a1969970175")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.isDisliked(987650)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.isDisliked(-Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})
