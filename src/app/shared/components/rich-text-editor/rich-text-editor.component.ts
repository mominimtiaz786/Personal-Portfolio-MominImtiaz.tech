import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-rich-text-editor',
  standalone: true,
  // Tiptap renders its contenteditable DOM itself, outside Angular's
  // template compiler, so emulated-encapsulated styles can't reach it.
  encapsulation: ViewEncapsulation.None,
  templateUrl: './rich-text-editor.component.html',
  styleUrl: './rich-text-editor.component.scss',
})
export class RichTextEditorComponent implements AfterViewInit, OnDestroy {
  private readonly http = inject(HttpClient);

  @ViewChild('editorElement', { static: true }) private editorElement!: ElementRef<HTMLElement>;
  @ViewChild('fileInput', { static: true }) private fileInput!: ElementRef<HTMLInputElement>;

  @Input() placeholder = 'Start writing…';

  @Input()
  set value(html: string) {
    this._value = html ?? '';
    if (this.editor && html !== this.editor.getHTML()) {
      this.editor.commands.setContent(this._value, { emitUpdate: false });
    }
  }
  get value(): string {
    return this._value;
  }
  private _value = '';

  @Output() valueChange = new EventEmitter<string>();

  editor?: Editor;
  uploading = false;

  ngAfterViewInit(): void {
    this.editor = new Editor({
      element: this.editorElement.nativeElement,
      extensions: [
        StarterKit.configure({ link: { openOnClick: false, autolink: true } }),
        Image,
        Placeholder.configure({ placeholder: this.placeholder }),
      ],
      content: this._value,
      onUpdate: ({ editor }) => {
        this._value = editor.getHTML();
        this.valueChange.emit(this._value);
      },
    });
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
  }

  toggleBold(): void {
    this.editor?.chain().focus().toggleBold().run();
  }

  toggleItalic(): void {
    this.editor?.chain().focus().toggleItalic().run();
  }

  toggleHeading(level: 2 | 3): void {
    this.editor?.chain().focus().toggleHeading({ level }).run();
  }

  toggleBulletList(): void {
    this.editor?.chain().focus().toggleBulletList().run();
  }

  toggleOrderedList(): void {
    this.editor?.chain().focus().toggleOrderedList().run();
  }

  toggleBlockquote(): void {
    this.editor?.chain().focus().toggleBlockquote().run();
  }

  setLink(): void {
    if (!this.editor) return;
    const previousUrl = this.editor.getAttributes('link')['href'] as string | undefined;
    const url = window.prompt('Link URL', previousUrl ?? 'https://');
    if (url === null) return;
    if (url === '') {
      this.editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    this.editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }

  isActive(name: string, attrs?: Record<string, unknown>): boolean {
    return this.editor?.isActive(name, attrs) ?? false;
  }

  focusIfEmptyAreaClicked(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.editor?.chain().focus('end').run();
    }
  }

  triggerImagePicker(): void {
    this.fileInput.nativeElement.click();
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    this.uploading = true;
    this.http.post<{ url: string }>(`${environment.apiUrl}/admin/uploads`, formData).subscribe({
      next: (res) => {
        this.uploading = false;
        this.editor?.chain().focus().setImage({ src: `${environment.apiUrl}${res.url}` }).run();
      },
      error: () => {
        this.uploading = false;
      },
    });
  }
}
