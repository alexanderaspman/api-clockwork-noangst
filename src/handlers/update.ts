import prisma from "../db";

// Helper function to send error responses
const sendError = (res, status, message) => {
  res.status(status).json({ error: message });
};

// Get one update
export const getOneUpdate = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return sendError(res, 400, "Update ID is required");
    }

    const update = await prisma.update.findUnique({
      where: {
        id,
      },
    });

    if (!update) {
      return sendError(res, 404, "Update not found");
    }

    res.json({ data: update });
  } catch (error) {
    console.error(error);
    sendError(res, 500, "Internal Server Error");
  }
};

// Get all updates
export const getUpdates = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });

    const updates = products.reduce((allUpdates, product) => {
      return [...allUpdates, ...product.updates];
    }, []);

    res.json({ data: updates });
  } catch (error) {
    console.error(error);
    sendError(res, 500, "Internal Server Error");
  }
};

// Create an update
export const createUpdate = async (req, res) => {
  try {
    const { productId, title, body } = req.body;

    if (!productId || !title || !body) {
      return sendError(res, 400, "Product ID, title, and body are required");
    }

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return sendError(res, 404, "Product not found");
    }

    const update = await prisma.update.create({
      data: {
        title,
        body,
        product: { connect: { id: product.id } },
      },
    });

    res.json({ data: update });
  } catch (error) {
    console.error(error);
    sendError(res, 500, "Internal Server Error");
  }
};

// Update an update
export const updateUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, body } = req.body;

    if (!id) {
      return sendError(res, 400, "Update ID is required");
    }

    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });

    const updates = products.reduce((allUpdates, product) => {
      return [...allUpdates, ...product.updates];
    }, []);

    const match = updates.find((update) => update.id === id);

    if (!match) {
      return sendError(res, 403, "You are not permitted to update this update");
    }

    const updateUpdate = await prisma.update.update({
      where: {
        id,
      },
      data: {
        title,
        body,
      },
    });

    res.json({ data: updateUpdate });
  } catch (error) {
    console.error(error);
    sendError(res, 500, "Internal Server Error");
  }
};

// Delete an update
export const deleteUpdate = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return sendError(res, 400, "Update ID is required");
    }

    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });

    const updates = products.reduce((allUpdates, product) => {
      return [...allUpdates, ...product.updates];
    }, []);

    const match = updates.find((update) => update.id === id);

    if (!match) {
      return sendError(res, 403, "You are not permitted to delete this update");
    }

    const deleted = await prisma.update.delete({
      where: {
        id,
      },
    });

    res.json({ data: deleted });
  } catch (error) {
    console.error(error);
    sendError(res, 500, "Internal Server Error");
  }
};