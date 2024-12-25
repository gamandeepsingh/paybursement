


export const verifyResponse = async (req, res) => {
    res.json({
      success: true,
      message: "Token is valid.",
      user: req.user,
    });
};