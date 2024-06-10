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