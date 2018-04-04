module.exports = {
    "extends": "airbnb",
    
    "env": {
        "browser": true
    },

    "rules": {
        "jsx-a11y/anchor-is-valid": [ "error", {
            "components": [ "Link" ],
            "specialLink": [ "to" ],
        }],
        'react/require-default-props': false,
        'jsx-a11y/no-noninteractive-element-interactions': false,
    }
}
