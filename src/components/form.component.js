import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.renderForm = this.renderForm.bind(this);
    }

    handleChange = (fieldName, e, { value }) => {
        let stateChanges = {};
        stateChanges[fieldName] = value;
        this.setState(stateChanges)
    }


    renderForm(form) {
        switch (form.type) {
            case 'input':
                return <Form.Input fluid label={form.label} placeholder={form.placeholder}
                    onChange={this.handleChange.bind(this, form.name)} />;
            case 'select':
                return <Form.Select fluid label={form.label} options={form.options} placeholder={form.placeholder}
                    onChange={this.handleChange.bind(this, form.name)} />
            case 'radio':
                return <Form.Group inline>
                    <label>{form.label}</label>
                    {form.options.map(option => <Form.Radio
                        key={form.value}
                        label={option.label}
                        value={option.value}
                        checked={this.state[form.name] === option.value}
                        onChange={this.handleChange.bind(this, form.name)}
                    />

                    )}
                </Form.Group>
            case 'textarea':
                return <Form.TextArea label={form.label} placeholder={form.placeholder}
                    onChange={this.handleChange.bind(this, form.name)} />
            case 'checkbox':
                return <Form.Checkbox label={form.label} placeholder={form.placeholder}
                    onChange={this.handleChange.bind(this, form.name)} />
        }
    }

    render() {
        return (
            <Form onSubmit={() => this.props.onSubmit(this.state)}>
                {this.props.forms.map(formItem => {
                    if (Array.isArray(formItem))
                        return (
                            <Form.Group widths="equal">
                                {formItem.map(this.renderForm)}
                            </Form.Group>
                        );
                    else
                        return this.renderForm(formItem);
                }
                )}
                <Form.Button>{this.props.submitButtonText}</Form.Button>
            </Form>
        );
    }
}

FormComponent.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    submitButtonText: PropTypes.string.isRequired,
    forms: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.objectOf({
            type: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            placeholder: PropTypes.string,
            label: PropTypes.string.isRequired,
            options: PropTypes.array
        }),
        PropTypes.arrayOf(PropTypes.objectOf({
            type: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            placeholder: PropTypes.string,
            label: PropTypes.string.isRequired,
            options: PropTypes.array
        }))
    ])).isRequired
};

export default FormComponent;