export const convertRollStringToObj = (string) => {
    // example string 1: 12d20+14
    // example string 2: 12d20
    // example string 3: 12

    // if just a static number (no dice roll), just return null
    const dIndex = string.indexOf("d")
    if (dIndex === -1) return null
    
    // otherwise continue on to parse and make object
    const outputObj = {
        dice_count: null,
        die: null,
        modifier: null
    }

    // iterate through string
    let currentString = ""
    let foundModifier
    for (let i = 0; i < string.length; i++) {
        switch (string[i]) {
            case "d":
                outputObj.dice_count = parseInt(currentString)
                currentString = ""
                break
            case "+":
                foundModifier = true
                outputObj.die = parseInt(currentString)
                currentString = ""
                break
            default:
                currentString += string[i]
        }
    }

    // after loop, determine which property the remaining currentString belongs to
    if (foundModifier) outputObj.modifier = parseInt(currentString)
    else outputObj.die = parseInt(currentString)

    return outputObj
}

export const convertActionDescriptionToObj = (action) => {
    // const exampleAction = {
    //     attack_bonus: 17,
    //     damage: [
    //         {damage_dice: "2d10+10"},
    //         {damage_dice: "4d6"}
    //     ],
    //     desc: "Melee Weapon Attack: +17 to hit, reach 15 ft., one target. Hit: 21 (2d10 + 10) piercing damage plus 14 (4d6) fire damage."
    // }
    const a = action

    // format damage dice to match the description (include the space)
    const actionHasAttackBonus = Object.hasOwn(a, "attack_bonus") && !isNaN(a.attack_bonus)
    const actionHasDamage = Object.hasOwn(a, "damage") && a.damage.length > 0
    if (actionHasDamage) for (const d of a.damage) d.damage_dice_formatted = d.damage_dice.split("+").join(" + ")

    const descriptionObj = {
        preBonus: "",
        preDamage: [""],
        remainder: ""
    }

    // attack bonus
    if (actionHasAttackBonus) descriptionObj.preBonus = a.desc.slice(0, a.desc.indexOf(a.attack_bonus) - 1)

    // damage
    if (actionHasDamage) {
        a.damage.map((d, index) => {
            if (index > 0) descriptionObj.preDamage[index] = a.desc.slice(a.desc.indexOf(a.damage[index - 1].damage_dice_formatted) + a.damage[index - 1].damage_dice_formatted.length + 1, a.desc.indexOf(d.damage_dice_formatted) - 1)
            else {
                if (actionHasAttackBonus) descriptionObj.preDamage[index] = a.desc.slice(a.desc.indexOf(a.attack_bonus) + a.attack_bonus.toString().length, a.desc.indexOf(d.damage_dice_formatted) - 1)
                else descriptionObj.preDamage[index] = a.desc.slice(0, a.desc.indexOf(d.damage_dice_formatted) - 1)
            }
        })
    }

    // remainder
    if (!actionHasAttackBonus && !actionHasDamage) descriptionObj.remainder = a.desc
    else if (actionHasAttackBonus && !actionHasDamage) descriptionObj.remainder = a.desc.slice(a.desc.indexOf(a.attack_bonus) + a.attack_bonus.toString().length)
    else if (actionHasDamage) descriptionObj.remainder = a.desc.slice(a.desc.indexOf(a.damage[a.damage.length - 1].damage_dice_formatted) + a.damage[a.damage.length - 1].damage_dice_formatted.toString().length + 1)
    else if (actionHasDamage) {
        // be sure to start from that LAST damage index, since it's an array
    } else {
        descriptionObj.remainder = a.desc
    }

    return descriptionObj
}

// console.log(convertActionDescriptionToObj(
//     {
//         attack_bonus: 17,
//         damage: [
//             {damage_dice: "2d10+10"},
//             {damage_dice: "4d6"}
//         ],
//         desc: "Melee Weapon Attack: +17 to hit, reach 15 ft., one target. Hit: 21 (2d10 + 10) piercing damage plus 14 (4d6) fire damage."
//     }
// ))

export const formatMonsterObj = (m) => {
    // creating a copy. idk if i need this or not
    const monsterObj = m
    // hit points object
    monsterObj.hit_points_roll_obj = convertRollStringToObj(monsterObj.hit_points_roll)
    // actions
    monsterObj.actions.map((a) => {
        a.desc_obj = convertActionDescriptionToObj(a)
        if (a.hasOwnProperty('damage') && a.damage.length > 0) a.damage.map((d) => {
            d.damage_dice_roll_obj = convertRollStringToObj(d.damage_dice)
        })
    })
    // legendary actions object
    monsterObj.legendary_actions.map((la) => {
        la.desc_obj = convertActionDescriptionToObj(la)
        if (la.hasOwnProperty('damage')) la.damage.map((d) => {
            d.damage_dice_roll_obj = convertRollStringToObj(d.damage_dice)
        })
    })
    // challenge rating string (fraction)
    if (monsterObj.challenge_rating < 1 && monsterObj.challenge_rating > 0) monsterObj.challenge_rating_fraction = `1/${1 / monsterObj.challenge_rating}`
    else monsterObj.challenge_rating_fraction = monsterObj.challenge_rating.toString()

    return monsterObj
}

export const emptySlot = {
    "initiative": {value: ""},
    "name": {value: ""},
    "ac": {value: ""},
    "hp": {value: "", isDead: false},
    "conditions": {
        "Blinded": {value: false, showIconPopup: false},
        "Charmed": {value: false, showIconPopup: false},
        "Deafened": {value: false, showIconPopup: false},
        "Frightened": {value: false, showIconPopup: false},
        "Grappled": {value: false, showIconPopup: false},
        "Incapacitated": {value: false, showIconPopup: false},
        "Invisible": {value: false, showIconPopup: false},
        "Paralyzed": {value: false, showIconPopup: false},
        "Petrified": {value: false, showIconPopup: false},
        "Poisoned": {value: false, showIconPopup: false},
        "Prone": {value: false, showIconPopup: false},
        "Restrained": {value: false, showIconPopup: false},
        "Stunned": {value: false, showIconPopup: false},
        "Unconscious": {value: false, showIconPopup: false},
        showDropdown: false
    },
    "notes": {value: ""}
}

export const defaultColumns = {
    "initiative": {displayOrder: 1, displayName: "Initiative", hidden: false, width: "7%"},
    "name": {displayOrder: 2, displayName: "Name", hidden: false, width: "18%"},
    "ac": {displayOrder: 3, displayName: "AC", hidden: false, width: "6%"},
    "hp": {displayOrder: 4, displayName: "HP", hidden: false, width: "6%"},
    "conditions": {displayOrder: 5, displayName: "Conditions", hidden: false, width: "18%"},
    "notes": {displayOrder: 6, displayName: "Notes", hidden: false, width: "34%"}
}