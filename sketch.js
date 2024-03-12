let fontSizeValues = [10, 15, 20, 25];  // 四个不同的 fontSize 值

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  background(0);
  frameRate(0.5);
}

function draw() {
  background(0);
  const texts = ['3月14日 ', '周三14:00', 'POST INFORMATION', '后信息时代', '元白楼', '美术馆','A座', 'AGE ', '后信息时代', '王敏', '田博'];
  const randomFontSizeIndex = floor(random(fontSizeValues.length));
  const randomFontSize = fontSizeValues[randomFontSizeIndex];

  drawRepeatText(texts, 255, randomFontSize);

  // 随机产生整个画布的glitch效果
  if (random() < 0.5) {  // 调整此处的概率
    glitchEffect();
  }
}

const iterator = (iNum, func) => {
  for (let count = iNum; count--;) {
    func(count);
  }
};

const initFont = (fontSize, font = 'helvetica', horizAlign = LEFT, vertAlign = TOP, leading = 1.5) => {
  textSize(fontSize);
  textFont(font);
  textAlign(horizAlign, vertAlign);
  textLeading(leading);
};

const drawRepeatText = (texts, baseTextColor, fontSize) => {
  const fixedTextWidth = 80;  // 固定的文本宽度
  const rows = ceil(height / fontSize);
  const columns = floor(width / fixedTextWidth);

  iterator(rows, (rowCount) => {
    iterator(columns, (columnCount) => {
      const randomText = random(texts);

      // 随机选择一些文本不绘制，模拟消失
      if (random() < 0.3) {
        return;
      }

      // 随机选择一些文本更改颜色
      const textColor = random() < 0.2 ? color(random(255), random(255), random(255)) : baseTextColor;

      fill(textColor);
      const marginX = (width - fixedTextWidth * columns) / (columns - 1);
      const marginY = (height - fontSize * rows) / (rows - 1);

      initFont(fontSize);
      const x = columnCount * (fixedTextWidth + marginX);
      const y = rowCount * (fontSize + marginY);

      // 绘制文本
      text(randomText, x, y);

      // 根据概率绘制矩形色块
      if (random() < 0.1) {  // 调整此处的概率
        const rectWidth = fixedTextWidth;  // 使矩形宽度与文本宽度相匹配
        const rectHeight = fontSize;  // 使矩形高度与文本高度相匹配
        const rectColor = color(random(255), random(255), random(255));
        fill(rectColor);
        rect(x, y + fontSize, rectWidth, rectHeight);
      }
    });
  });
};

const glitchEffect = () => {
  // 设置混合模式为DIFFERENCE，产生glitch效果
  blendMode(DIFFERENCE);

  // 随机绘制一些随机大小和颜色的矩形，模拟glitch效果
  for (let i = 0; i < 5; i++) {
    const rectWidth = random(width);
    const rectHeight = random(height);
    const rectColor = color(random(255), random(255), random(255));
    fill(rectColor);
    noStroke();
    rect(random(width), random(height), rectWidth, rectHeight);
  }

  // 恢复混合模式为NORMAL
  blendMode(NORMAL);
};

