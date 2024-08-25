const restrictAccess = (...role) => {
    const checkPermission = (req, res, next) => {
        if (!role.includes(req.user.role)) {
            return res.status(403).json({
                info: "This user do not have permission to perform this action"
            });
        }

        return next();
    };

    return checkPermission;
};

module.exports = { restrictAccess }