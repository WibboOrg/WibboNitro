import { MoveAvatarKeyboardComposer } from '../communication/messages/outgoing/custom/user/MoveAvatarKeyboardComposer';
import { Nitro } from '../Nitro';

export class KeyboardManager
{
    private up: boolean = false;
    private down: boolean = false;
    private left: boolean = false;
    private right: boolean = false;

    private updateInternal: number;

    private x: number = 0;
    private y: number = 0;

    public init(): void
    {
        document.body.addEventListener('keydown', this.onPress.bind(this));
        document.body.addEventListener('keyup', this.onDown.bind(this));

        this.updateInternal = window.setInterval(this.onUpdate.bind(this), 250);
    }

    private anotherInputHasFocus(): boolean
    {
        const activeElement = document.activeElement;

        if(!activeElement) return false;

        if(!(activeElement instanceof HTMLInputElement) && !(activeElement instanceof HTMLTextAreaElement)) return false;

        return true;
    }

    private onDown(e: KeyboardEvent)
    {
        // if(this.anotherInputHasFocus()) return;

        if(e.key == 'ArrowUp') this.up = false;
        if(e.key == 'ArrowDown') this.down = false;
        if(e.key == 'ArrowLeft') this.left = false;
        if(e.key == 'ArrowRight') this.right = false;
    }

    private onPress(e: KeyboardEvent)
    {
        // if(this.anotherInputHasFocus()) return;

        if(e.key == 'ArrowUp') this.up = true;
        if(e.key == 'ArrowDown') this.down = true;
        if(e.key == 'ArrowLeft') this.left = true;
        if(e.key == 'ArrowRight') this.right = true;
    }

    private onUpdate()
    {
        let newX = 0;
        let newY = 0;

        if(this.up && !this.right && !this.left && !this.down) newX = -1, newY = -1;
        else if(!this.up && this.right && !this.left && !this.down) newX = 1, newY = -1;
        else if(!this.up && !this.right && this.left && !this.down) newX = -1, newY = 1;
        else if(!this.up && !this.right && !this.left && this.down) newX = 1, newY = 1;
        else if(this.up && this.right && !this.left && !this.down) newY = -1;
        else if(this.up && !this.right && this.left && !this.down) newX = -1;
        else if(!this.up && this.right && !this.left && this.down) newX = 1;
        else if(!this.up && !this.right && this.left && this.down) newY = 1;

        if(newX == this.x && newY == this.y) return;

        this.x = newX;
        this.y = newY;

        Nitro.instance.communication.connection.send(new MoveAvatarKeyboardComposer(this.x, this.y));
    }
}
