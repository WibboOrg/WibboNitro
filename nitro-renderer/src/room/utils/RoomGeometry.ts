import { Point } from '@pixi/math';
import { IRoomGeometry, IVector3D, Vector3d } from '../../api';

export class RoomGeometry implements IRoomGeometry
{
    public static SCALE_ZOOMED_IN: number = 64;
    public static SCALE_ZOOMED_OUT: number = 32;

    private _updateId: number = 0;
    private _x: IVector3D;
    private _y: IVector3D;
    private _z: IVector3D;
    private _directionAxis: IVector3D;
    private _location: IVector3D;
    private _direction: IVector3D;
    private _depth: IVector3D;
    private _scale: number = 1;
    private _x_scale: number = 1;
    private _y_scale: number = 1;
    private _z_scale: number = 1;
    private _x_scale_internal: number = 1;
    private _y_scale_internal: number = 1;
    private _z_scale_internal: number = 1;
    private _loc: IVector3D;
    private _dir: IVector3D;
    private _clipNear: number = -500;
    private _clipFar: number = 500;
    private _displacements: Map<string, IVector3D> = null;

    constructor(scale: number, direction: IVector3D, location: IVector3D, defaultDirection: IVector3D = null)
    {
        this.scale = scale;
        this._x = new Vector3d();
        this._y = new Vector3d();
        this._z = new Vector3d();
        this._directionAxis = new Vector3d();
        this._location = new Vector3d();
        this._direction = new Vector3d();
        this._depth = new Vector3d();
        this._x_scale_internal = 1;
        this._y_scale_internal = 1;
        this.x_scale = 1;
        this.y_scale = 1;
        this._z_scale_internal = (Math.sqrt((1 / 2)) / Math.sqrt((3 / 4)));
        this.z_scale = 1;
        this.location = new Vector3d(location.x, location.y, location.z);
        this.direction = new Vector3d(direction.x, direction.y, direction.z);
        if(defaultDirection != null)
        {
            this.setDepthVector(defaultDirection);
        }
        else
        {
            this.setDepthVector(direction);
        }
        this._displacements = new Map();
    }

    public static getIntersectionVector(point: IVector3D, direction: IVector3D, planePoint: IVector3D, planeNormal: IVector3D): IVector3D | null
    {
        const dotProduct = Vector3d.dotProduct(direction, planeNormal);

        if(Math.abs(dotProduct) < 1E-5)
        {
            return null;
        }

        const vectorToPlane = Vector3d.dif(point, planePoint);
        const scalarProjection = -(Vector3d.dotProduct(planeNormal, vectorToPlane)) / dotProduct;
        const intersectionVector = Vector3d.sum(point, Vector3d.product(direction, scalarProjection));

        return intersectionVector;
    }

    public get updateId(): number
    {
        return this._updateId;
    }

    public get scale(): number
    {
        return this._scale / Math.sqrt(0.5);
    }

    public set scale(scale: number)
    {
        if(scale <= 1)
        {
            scale = 1;
        }
        scale = (scale * Math.sqrt(0.5));
        if(scale != this._scale)
        {
            this._scale = scale;
            this._updateId++;
        }
    }

    public get directionAxis(): IVector3D
    {
        return this._directionAxis;
    }

    public get location(): IVector3D
    {
        this._location.assign(this._loc);
        this._location.x = (this._location.x * this._x_scale);
        this._location.y = (this._location.y * this._y_scale);
        this._location.z = (this._location.z * this._z_scale);
        return this._location;
    }

    public set location(newLocation: IVector3D)
    {
        if(newLocation == null)
        {
            return;
        }

        if(this._loc == null)
        {
            this._loc = new Vector3d();
        }

        const oldX = this._loc.x;
        const oldY = this._loc.y;
        const oldZ = this._loc.z;

        this._loc.assign(newLocation);
        this._loc.x = this._loc.x / this._x_scale;
        this._loc.y = this._loc.y / this._y_scale;
        this._loc.z = this._loc.z / this._z_scale;

        if(this._loc.x !== oldX || this._loc.y !== oldY || this._loc.z !== oldZ)
        {
            this._updateId++;
        }
    }

    public get direction(): IVector3D
    {
        return this._direction;
    }

    public set direction(newDirection: IVector3D)
    {
        if(newDirection == null)
        {
            return;
        }

        if(this._dir == null)
        {
            this._dir = new Vector3d();
        }

        const oldX = this._dir.x;
        const oldY = this._dir.y;
        const oldZ = this._dir.z;

        this._dir.assign(newDirection);
        this._direction.assign(newDirection);

        if(!(this._dir.x == oldX) || !(this._dir.y == oldY) || !(this._dir.z == oldZ))
        {
            this._updateId++;
        }

        const xAxis = new Vector3d(0, 1, 0);
        const yAxis = new Vector3d(0, 0, 1);
        const zAxis = new Vector3d(1, 0, 0);

        const radianX = (newDirection.x / 180) * Math.PI;
        const radianY = (newDirection.y / 180) * Math.PI;
        const radianZ = (newDirection.z / 180) * Math.PI;

        const cosX = Math.cos(radianX);
        const sinX = Math.sin(radianX);

        const tempVar6 = Vector3d.sum(Vector3d.product(xAxis, cosX), Vector3d.product(zAxis, -(sinX)));
        const tempVar8 = Vector3d.sum(Vector3d.product(xAxis, sinX), Vector3d.product(zAxis, cosX));

        const cosY = Math.cos(radianY);
        const sinY = Math.sin(radianY);

        const tempVar11 = Vector3d.sum(Vector3d.product(yAxis, cosY), Vector3d.product(tempVar8, sinY));
        const tempVar12 = Vector3d.sum(Vector3d.product(yAxis, -(sinY)), Vector3d.product(tempVar8, cosY));

        if(radianZ != 0)
        {
            const cosZ = Math.cos(radianZ);
            const sinZ = Math.sin(radianZ);

            const tempVar3 = Vector3d.sum(Vector3d.product(tempVar6, cosZ), Vector3d.product(tempVar11, sinZ));
            const tempVar4 = Vector3d.sum(Vector3d.product(tempVar6, -(sinZ)), Vector3d.product(tempVar11, cosZ));

            this._x.assign(tempVar3);
            this._y.assign(tempVar4);
            this._z.assign(tempVar12);
            this._directionAxis.assign(this._z);
        }
        else
        {
            this._x.assign(tempVar6);
            this._y.assign(tempVar11);
            this._z.assign(tempVar12);
            this._directionAxis.assign(this._z);
        }
    }

    public set x_scale(xScale: number)
    {
        if(this._x_scale != (xScale * this._x_scale_internal))
        {
            this._x_scale = (xScale * this._x_scale_internal);
            this._updateId++;
        }
    }

    public set y_scale(yScale: number)
    {
        if(this._y_scale != (yScale * this._y_scale_internal))
        {
            this._y_scale = (yScale * this._y_scale_internal);
            this._updateId++;
        }
    }

    public set z_scale(zScale: number)
    {
        if(this._z_scale != (zScale * this._z_scale_internal))
        {
            this._z_scale = (zScale * this._z_scale_internal);
            this._updateId++;
        }
    }

    public dispose(): void
    {
        this._x = null;
        this._y = null;
        this._z = null;
        this._loc = null;
        this._dir = null;
        this._directionAxis = null;
        this._location = null;
        if(this._displacements != null)
        {
            this._displacements.clear();
            this._displacements = null;
        }
    }

    public setDisplacement(position: IVector3D, displacement: IVector3D): void
    {
        if(position == null || displacement == null)
        {
            return;
        }

        if(this._displacements !== null)
        {
            const key = `${Math.trunc(Math.round(position.x))}_${Math.trunc(Math.round(position.y))}_${Math.trunc(Math.round(position.z))}`;

            this._displacements.delete(key);

            const newDisplacement = new Vector3d();
            newDisplacement.assign(displacement);
            this._displacements.set(key, newDisplacement);

            this._updateId++;
        }
    }

    private getDisplacement(vector: IVector3D): IVector3D | null
    {
        if(this._displacements !== null)
        {
            const key = `${Math.trunc(Math.round(vector.x))}_${Math.trunc(Math.round(vector.y))}_${Math.trunc(Math.round(vector.z))}`;
            return this._displacements.get(key);
        }

        return null;
    }

    public setDepthVector(rotationVector: IVector3D): void
    {
        const xAxis = new Vector3d(0, 1, 0);
        const yAxis = new Vector3d(0, 0, 1);
        const zAxis = new Vector3d(1, 0, 0);

        const angleX = (rotationVector.x / 180) * Math.PI;
        const angleY = (rotationVector.y / 180) * Math.PI;

        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);

        const depthYAxis = Vector3d.sum(Vector3d.product(xAxis, sinX), Vector3d.product(zAxis, cosX));

        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const depthY = Vector3d.sum(Vector3d.product(yAxis, -(sinY)), Vector3d.product(depthYAxis, cosY));

        this._depth.assign(depthY);

        this._updateId++;
    }

    public adjustLocation(vector: IVector3D, adjustment: number): void
    {
        if(vector == null || this._z == null)
        {
            return;
        }

        const adjustedZ = Vector3d.product(this._z, -adjustment);
        const adjustedVector = new Vector3d(
            vector.x + adjustedZ.x,
            vector.y + adjustedZ.y,
            vector.z + adjustedZ.z
        );

        this.location = adjustedVector;
    }

    public getCoordinatePosition(vector: IVector3D): IVector3D | null
    {
        if(vector == null)
        {
            return null;
        }

        const xProjection = Vector3d.scalarProjection(vector, this._x);
        const yProjection = Vector3d.scalarProjection(vector, this._y);
        const zProjection = Vector3d.scalarProjection(vector, this._z);

        const resultVector = new Vector3d(xProjection, yProjection, zProjection);
        return resultVector;
    }

    public getScreenPosition(point: IVector3D): IVector3D | null
    {
        if(point === null)
        {
            return null;
        }

        let relativePosition = Vector3d.dif(point, this._loc);
        relativePosition.x *= this._x_scale;
        relativePosition.y *= this._y_scale;
        relativePosition.z *= this._z_scale;

        let depthProjection = Vector3d.scalarProjection(relativePosition, this._depth);

        if(depthProjection < this._clipNear || depthProjection > this._clipFar)
        {
            return null;
        }

        let xProjection = Vector3d.scalarProjection(relativePosition, this._x);
        let yProjection = -Vector3d.scalarProjection(relativePosition, this._y);
        xProjection *= this._scale;
        yProjection *= this._scale;

        const displacement = this.getDisplacement(point);
        if(displacement !== null)
        {
            relativePosition = Vector3d.dif(point, this._loc);
            relativePosition.add(displacement);
            relativePosition.x *= this._x_scale;
            relativePosition.y *= this._y_scale;
            relativePosition.z *= this._z_scale;
            depthProjection = Vector3d.scalarProjection(relativePosition, this._depth);
        }

        relativePosition.x = xProjection;
        relativePosition.y = yProjection;
        relativePosition.z = depthProjection;

        return relativePosition;
    }

    public getScreenPoint(vector: IVector3D): Point | null
    {
        const screenPosition = this.getScreenPosition(vector);

        if(screenPosition == null)
        {
            return null;
        }

        const screenPoint = new Point(screenPosition.x, screenPosition.y);
        return screenPoint;
    }

    public getPlanePosition(point: Point, xAxis: IVector3D, yAxis: IVector3D, zAxis: IVector3D): Point | null
    {
        const scaledX = point.x / this._scale;
        const scaledY = -point.y / this._scale;

        const xComponent = Vector3d.product(this._x, scaledX);
        const yComponent = Vector3d.product(this._y, scaledY);

        const position = new Vector3d(
            this._loc.x * this._x_scale + xComponent.x + yComponent.x,
            this._loc.y * this._y_scale + xComponent.y + yComponent.y,
            this._loc.z * this._z_scale + xComponent.z + yComponent.z
        );

        const intersectionVector = RoomGeometry.getIntersectionVector(position, this._z, xAxis, Vector3d.crossProduct(yAxis, zAxis));

        if(intersectionVector !== null)
        {
            intersectionVector.subtract(xAxis);

            const projectionOnY = Vector3d.scalarProjection(intersectionVector, yAxis);
            const projectionOnZ = Vector3d.scalarProjection(intersectionVector, zAxis);

            const resultPoint = new Point(
                (projectionOnY / yAxis.length) * yAxis.length,
                (projectionOnZ / zAxis.length) * zAxis.length
            );

            return resultPoint;
        }

        return null;
    }

    public performZoom(): void
    {
        if(this.isZoomedIn())
        {
            this.scale = RoomGeometry.SCALE_ZOOMED_OUT;
        }
        else
        {
            this.scale = RoomGeometry.SCALE_ZOOMED_IN;
        }
    }

    public isZoomedIn(): boolean
    {
        return this.scale == RoomGeometry.SCALE_ZOOMED_IN;
    }

    public performZoomOut(): void
    {
        this.scale = RoomGeometry.SCALE_ZOOMED_OUT;
    }

    public performZoomIn(): void
    {
        this.scale = RoomGeometry.SCALE_ZOOMED_IN;
    }
}
