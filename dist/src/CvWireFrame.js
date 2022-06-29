import { Dimension } from './Dimension.js';
export class CvWireframe {
    constructor(g, canvas) {
        this.g = g;
        this.canvas = canvas;
    }
    getObj() { return this.obj; }
    setObj(obj) { this.obj = obj; }
    iX(x) { return Math.round(this.centerX + x - this.imgCenter.x); }
    iY(y) { return Math.round(this.centerY - y + this.imgCenter.y); }
    paint() {
        if (this.obj == undefined)
            return;
        let polyList = this.obj.getPolyList();
        if (polyList == undefined)
            return;
        let nFaces = polyList.length;
        if (nFaces == 0)
            return;
        let dim = new Dimension(this.canvas.width, this.canvas.height);
        this.canvas.width = this.canvas.width;
        this.maxX = dim.width - 1;
        this.maxY = dim.height - 1;
        this.centerX = this.maxX / 2;
        this.centerY = this.maxY / 2;
        // ze-axis towards eye, so ze-coordinates of
        // object points are all negative.
        // obj is a java object that contains all data:
        // - Vector w       (world coordinates)
        // - Array e        (eye coordinates)
        // - Array vScr     (screen coordinates)
        // - Vector polyList (Polygon3D objects)
        // Every Polygon3D value contains:
        // - Array 'nrs' for vertex numbers
        // - Values a, b, c, h for the plane ax+by+cz=h.
        // (- Array t (with nrs.length-2 elements of type Tria))
        this.obj.eyeAndScreen(dim);
        // Computation of eye and screen coordinates.
        this.imgCenter = this.obj.getImgCenter();
        this.obj.planeCoeff(); // Compute a, b, c and h.
        let e = this.obj.getE();
        let vScr = this.obj.getVScr();
        //g.setColor(Color.black);
        for (let j = 0; j < nFaces; j++) {
            let pol = polyList[j];
            let nrs = pol.getNrs();
            if (nrs.length < 3)
                continue;
            for (let iA = 0; iA < nrs.length; iA++) {
                let iB = (iA + 1) % nrs.length;
                let na = Math.abs(nrs[iA]), nb = Math.abs(nrs[iB]);
                // abs in view of minus signs discussed in Section 6.4.
                let a = vScr[na], b = vScr[nb];
                this.drawLine(this.g, this.iX(a.x), this.iY(a.y), this.iX(b.x), this.iY(b.y));
            }
        }
    }
    drawLine(g, x1, y1, x2, y2) {
        g.beginPath();
        g.moveTo(x1, y1);
        g.lineTo(x2, y2);
        g.closePath();
        g.stroke();
    }
}
