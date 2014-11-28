exports.test_email_address = function(email) {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email);
};

exports.test_username = function(username) {
    return /^([a-zA-Z0-9_\.\-])+$/.test(username);
};

exports.test_numeric = function(id) {
    return /^([0-9])+$/.test(id);
};