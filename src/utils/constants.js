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

export const exampleMonsterObj = {
    index: "skeleton",
    name: "Skeleton",
    size: "bob",
    type: "undead",
    alignment: "lawful evil",
    // below is an array. do i need to iterate through it? are there monsters with multiple of these?
    armor_class: [
        {
            type: "armor",
            value: 13,
            desc: "armor scraps"
        }
    ],
    hit_points: 13,
    hit_dice: "2d8",
    hit_points_roll: "2d8+4",
    hit_points_roll_obj: {
        die_count: 2,
        die: 8,
        modifier: 4
    },
    // remember there are other speed types (swim, fly, etc.)
    speed: {
        walk: "30 ft."
    },
    strength: 10,
    // "To determine an ability modifier, subtract 10 from the ability score and then divide the total by 2 (round down)"
    dexterity: 14,
    constitution: 15,
    intelligence: 6,
    wisdom: 8,
    charisma: 5,
    proficiencies: [],
    damage_vulnerabilities: [
        "bludgeoning"
    ],
    damage_resistances: [],
    damage_immunities: [
        "poison"
    ],
    condition_immunities: [
        {
            index: "poisoned",
            name: "Poisoned",
            url: "/api/conditions/poisoned"
        },
        {
            index: "exhaustion",
            name: "Exhaustion",
            url: "/api/conditions/exhaustion"
        }
    ],
    senses: {
        darkvision: "60 ft.",
        passive_perception: 9
    },
    languages: "understands all languages it spoke in life but can't speak",
    challenge_rating: 0.25,
    proficiency_bonus: 2,
    xp: 50,
    actions: [
        {
            name: "Shortsword",
            desc: "Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
            attack_bonus: 4,
            damage: [
                {
                    damage_type: {
                        index: "piercing",
                        name: "Piercing",
                        url: "/api/damage-types/piercing"
                    },
                    damage_dice: "1d6+2",
                    damage_dice_roll_obj: {
                        die_count: 1,
                        die: 6,
                        modifier: 2
                    }
                }
            ],
            actions: []
        },
        {
            name: "Shortbow",
            desc: "Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.",
            attack_bonus: 4,
            damage: [
                {
                    damage_type: {
                        index: "piercing",
                        name: "Piercing",
                        url: "/api/damage-types/piercing"
                    },
                    damage_dice: "1d6+2",
                    damage_dice_roll_obj: {
                        dieCount: 1,
                        die: 6,
                        modifier: 2
                    }
                }
            ],
            actions: []
        }
    ],
    url: "/api/monsters/skeleton",
    legendary_actions: [],
    special_abilities: []
}

//----------------------------------------------
// note: take from the dndbeyond stat block. i think this basically covers everything, but it's not 100% accurate (there is no "reactions" section for example)
// Ancient Red Dragon
// Huge dragon, chaotic evil

// Armor Class 22 (natural armor)
// Hit Points 256 (19d12 + 114)
// Speed 40 ft., fly 80 ft., swim 40 ft.

// ----------------------------------------------
// Str 27 (+8), Dex 10 (+0), Con 25 (+7),
// Int 16 (+3), Wis 13 (+1), Cha 21 (+5)

// Saving Throws Dex +6, Con +13, Wis +7, Cha +11
// Skills Perception +13, Stealth +6
// Damage Resistances fire, bludgeoning, piercing, and slashing from nonmagical attacks
// Condition Immunities charmed, frightened, paralyzed, poisoned
// Senses blindsight 60 ft., darkvision 120 ft., passive Perception 23
// Languages Common, Draconic
// Challenge 24 (62,000 XP)
// ----------------------------------------------

// Traits:
// - Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead.

// Actions:
// - Multiattack. The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.
// - Bite. Melee Weapon Attack: +16 to hit, reach 15 ft., one target. Hit: 21 (2d10 + 10) piercing damage plus 14 (4d6) fire damage.
// - Claw. Melee Weapon Attack: +16 to hit, reach 10 ft., one target. Hit: 17 (2d6 + 10) slashing damage.
// - Tail Attack. When a creature within 10 feet of the dragon hits it with an attack, the dragon can use its reaction to make a tail attack against that creature.

// Reactions:
// - Tail Attack. When a creature within 10 feet of the dragon hits it with an attack, the dragon can use its reaction to make a tail attack against that creature.

// Legendary Actions (3/Day):
// - Detect. The dragon makes a Wisdom (Perception) check.
// - Tail Attack. The dragon makes a tail attack.
// - Wing Attack (Costs 2 Actions). The dragon beats its wings. Each creature within 15 feet of the dragon must succeed on a DC 25 Dexterity saving throw or take 17 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.