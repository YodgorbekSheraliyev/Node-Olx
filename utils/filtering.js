const filtering = (category, from, to, region) => {
  let filtering;

  // All fields chosen
  if (category && from && to && region) {
    filtering = {
      amount: { $gte: from, $lte: to },
      category,
      region,
    };
  }

  // Category chosen only
  if (category && !from && !to && !region) {
    filtering = {
      category,
    };
  }

  // from chosen only
  if (!category && from && !to && !region) {
    filtering = {
      amount: { $gte: from },
    };
  }

  // to chosen only
  if (!category && !from && to && !region) {
    filtering = {
      amount: { $lte: to },
    };
  }

  // Region chosen only
  if (!category && !from && !to && region) {
    filtering = {
      region,
    };
  }

  // Category and from chosen only
  if (category && from && !to && !region) {
    filtering = {
      category,
      amount: { $gte: from },
    };
  }

  // Category and to chosen only
  if (category && !from && to && !region) {
    filtering = {
      category,
      amount: { $lte: to },
    };
  }
  // Category and regions chosen only
  if (category && !from && !to && region) {
    filtering = {
      category,
      region,
    };
  }

  // from and to chosen only
  if (!category && from && to && !region) {
    filtering = {
      amount: { $gte: from, $lte: to },
    };
  }

  // from and region chosen only
  if (!category && from && !to && region) {
    filtering = {
      region,
      amount: { $gte: from },
    };
  }

  // to and region chosen only
  if (!category && !from && to && region) {
    filtering = {
      region,
      amount: { $gte: from },
    };
  }
  // Category, from and to chosen only
  if (category && from && to && !region) {
    filtering = {
      category,
      amount: { $gte: from, $lte: to },
    };
  }

  // Category, from and region chosen only
  if (category && from && !to && region) {
    filtering = {
      category,
      amount: { $gte: from },
      region,
    };
  }

  // Category, to and region chosen only
  if (category && !from && to && region) {
    filtering = {
      category,
      amount: { $lte: to },
      region,
    };
  }

  // from, to and region chosen only
  if (!category && from && to && region) {
    filtering = {
      amount: {
        $gte: from,
        $lte: to,
      },
      region,
    };
  }

  return filtering;
};

module.exports = filtering;
