export class CanvasLocal {
    constructor(g, canvas) {
        this.rWidth = 60.0;
        this.rHeight = 60.0;
        //alto =parseFloat((<HTMLInputElement>document.getElementById('alto')).value);
        //ancho =parseFloat((<HTMLInputElement>document.getElementById('ancho')).value);
        this.alto = 12.0;
        this.ancho = 12.0;
        this.graphics = g;
        this.maxX = canvas.width - 1;
        this.maxY = canvas.height - 1;
        this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
        this.centerX = this.maxX / 2;
        this.centerY = this.maxY / 2;
        this.pixeltama = Math.max(this.ancho / this.maxX, this.alto / this.maxY);
        this.centerX = this.maxX / 2;
        this.centerY = this.maxY / 2;
    }
    iX(x) { return Math.round(this.centerX + x / this.pixelSize); }
    iY(y) { return Math.round(this.centerY - y / this.pixelSize); }
    iX2(x) { return Math.round(this.centerX + x / this.pixeltama); }
    iY2(y) { return Math.round(this.centerY - y / this.pixeltama); }
    drawLine(x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.closePath();
        this.graphics.stroke();
    }
    paint() {
        //ejes
        this.drawLine(this.iX(-12), this.iY(0), this.iX(12), this.iY(0));
        this.drawLine(this.iX(0), this.iY(-12), this.iX(0), this.iY(12));
        //maya1
        this.graphics.strokeStyle = "#d6e0c0";
        for (let i = -30; i <= 30; i++) {
            this.drawLine(this.iX(i), this.iY(-30), this.iX(i), this.iY(30));
            this.drawLine(this.iX(-30), this.iY(i), this.iX(30), this.iY(i));
        }
        this.graphics.strokeStyle = "#5b6363";
        for (let i = -6; i <= 6; i++) {
            this.drawLine(this.iX2(i), this.iY2(-6), this.iX2(i), this.iY2(6));
            this.graphics.fillText(i + "", this.iX2(i), this.iY2(-0.2));
            this.drawLine(this.iX2(-6), this.iY2(i), this.iX2(6), this.iY2(i));
            this.graphics.fillText(i + "", this.iX2(-0.2), this.iY2(i));
        }
    }
}
