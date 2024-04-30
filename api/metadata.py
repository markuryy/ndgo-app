from flask import Flask, request, jsonify
import base64
import tempfile
from PIL import Image
from unstable_reader.extractor import ImageMetadataExtractor

app = Flask(__name__)

@app.route('/api/metadata', methods=['POST'])
def handle_request():
    data = request.get_json(force=True)
    base64_image = data['image']
    image_data = base64.b64decode(base64_image.split(',')[1])

    with tempfile.NamedTemporaryFile(delete=False, suffix='.png') as temp_file:
        temp_file.write(image_data)
        temp_file_path = temp_file.name

    extractor = ImageMetadataExtractor(temp_file_path)
    extractor.extract_metadata()

    metadata = {
        'raw': extractor.raw,
        'prompt': extractor.prompt,
        'negative_prompt': extractor.negative,
        'tool': extractor.tool,
        'seed': extractor.seed,
        'width': extractor.width,
        'height': extractor.height,
        'workflow': extractor.workflow,
        'parameters': extractor.parameters
    }

    return jsonify(metadata)

if __name__ == '__main__':
    app.run(debug=True)